package sg.edu.nus.server.controllers;

import java.util.UUID;
import java.util.logging.Logger;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import sg.edu.nus.server.models.Registration;
import sg.edu.nus.server.models.Response;

@RestController
@RequestMapping("/api")
public class RegistrationRestController {
    
    private Logger logger = Logger.getLogger(RegistrationRestController.class.getName());

    @PostMapping(path = "/registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postRegistration(@RequestBody String payload) {
        Registration reg;
        Response resp;
        
        logger.info("Payload: %s".formatted(payload));

        String id = UUID.randomUUID().toString().substring(0, 8);

        try {
            reg = Registration.create(payload);
            reg.setId(id);
        } catch (Exception e) {
            resp = new Response();
            resp.setCode(400);
            resp.setMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(resp.toJson().toString());
        }

        resp = new Response();
        resp.setCode(201);
        resp.setMessage(id);
        resp.setData(reg.toJson().toString());

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(resp.toJson().toString());
    }
}
