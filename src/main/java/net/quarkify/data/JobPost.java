package net.quarkify.data;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class JobPost extends PanacheEntity {
    public String title;
    public String description;
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
