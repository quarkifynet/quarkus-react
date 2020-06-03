package net.quarkify.data;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class User extends PanacheEntity {
    public String name;
    public String email;
    public String password; // Use e.g Bcrypt to encrypt password, don't store it as plain text :)
    @JsonbTransient
    @OneToMany
    public List<JobPost> posts;
    @JsonbTransient
    @OneToMany
    public List<JobProposal> proposals;

}
