package sg.edu.nus.server.services;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.nus.server.models.Contact;
import sg.edu.nus.server.repositories.ContactRepository;

@Service
public class ContactService {
    @Autowired
    ContactRepository contactRepo;

    public Boolean addContact(Contact c) {
        System.out.println(c.toJson());
        contactRepo.save(c);
        Optional<Contact> opt = contactRepo.findById(c.getEmail());
        return opt.isPresent();
    }

    public List<Contact> getContacts() {
        List<Contact> contacts = new ArrayList<>();
        contactRepo.findAll().forEach(contacts::add);
        return contacts;
    }

    public Optional<Contact> delContact(String email) {
        Optional<Contact> opt = contactRepo.findById(email);
        contactRepo.deleteById(email);
        return opt;
    }
}
