package sg.edu.nus.server.models;

import java.io.Serializable;
import java.io.StringReader;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@RedisHash("contact")
public class Contact implements Serializable {
    private String name;
    @Id
    private String email;
    private Integer mobile;

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

    public Integer getMobile() {
        return mobile;
    }

    public void setMobile(Integer mobile) {
        this.mobile = mobile;
    }

    public static Contact create(String json) {
        Contact c = new Contact();
        JsonObject o = Json.createReader(new StringReader(json)).readObject();
        c.setName(o.getString("name"));
        c.setEmail(o.getString("email"));
        c.setMobile(o.getInt("mobile"));
        return c;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                .add("name", name)
                .add("email", email)
                .add("mobile", mobile)
                .build();
    }
}
