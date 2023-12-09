package sg.edu.nus.server.controllers;

import java.io.StringReader;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.json.*;
import sg.edu.nus.server.models.Contact;
import sg.edu.nus.server.models.Response;
import sg.edu.nus.server.services.ContactService;

@RestController
@RequestMapping("/api")
public class ContactRestController {

    @Autowired
    ContactService contactSvc;

    private Logger logger = Logger.getLogger(ContactRestController.class.getName());

    @PostMapping("/addContact")
    public ResponseEntity<String> addContact(@RequestBody String payload) {
        Contact c;
        Response resp = new Response();

        logger.info("Payload: %s".formatted(payload));

        try {
            c = Contact.create(payload);
        } catch (Exception e) {
            resp.setCode(400);
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(resp.toJson().toString());
        }

        if (contactSvc.addContact(c)) {
            resp.setCode(201);
            resp.setData(c.toJson().toString());
        } else {
            resp.setCode(400);
            resp.setMessage("Unable to add contact");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(resp.toJson().toString());
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(resp.toJson().toString());
    }

    @GetMapping("/getContacts")
    public ResponseEntity<String> getContacts() {
        Response resp = new Response();
        List<Contact> contacts = contactSvc.getContacts();
        JsonArrayBuilder ab = Json.createArrayBuilder();
        for (Contact contact : contacts) {
            ab.add(contact.toJson());
        }
        resp.setCode(200);
        resp.setMessage("Get contacts");
        resp.setData(ab.build().toString());
        return ResponseEntity.status(HttpStatus.OK)
                .body(resp.toJson().toString());
    }

    @PostMapping("/deleteContact")
    public ResponseEntity<String> deleteContact(@RequestBody String payload) {
        Response resp = new Response();
        JsonObject o = null;

        logger.info("Payload: %s".formatted(payload));

        try {
            o = Json.createReader(new StringReader(payload)).readObject();
        } catch (Exception e) {
            resp.setCode(400);
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(resp.toJson().toString());
        }

        String email = o.getString("email");
        logger.info("Email: %s".formatted(email));
        Optional<Contact> opt = contactSvc.delContact(email);
        if (opt.isEmpty()) {
            resp.setCode(200);
            resp.setMessage("nothing");
        } else {
            resp.setCode(200);
            resp.setMessage(opt.get().getName());
            resp.setData(opt.get().toJson().toString());
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(resp.toJson().toString());
    }
}
