package sg.edu.nus.server.models;

import java.io.*;
import jakarta.json.*;

public class Registration {
    
    private String id;
    private String name;
    private String email;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    public static Registration create(String json) throws IOException{
        Registration r = new Registration();
        JsonObject o = Json.createReader(new StringReader(json)).readObject();
        if(o.containsKey("id"))
            r.setId(o.getString("id"));
        r.setName(o.getString("name"));
        r.setEmail(o.getString("email"));
        return r;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("name", name)
            .add("email", email)
            .build();
    }
}
