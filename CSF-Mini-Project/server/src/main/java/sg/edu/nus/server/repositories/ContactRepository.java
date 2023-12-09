package sg.edu.nus.server.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import sg.edu.nus.server.models.Contact;

@Repository
public interface ContactRepository extends CrudRepository<Contact, String>{ }