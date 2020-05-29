package net.quarkify.data;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class JobPost extends PanacheEntity {
    public String title;
    public String description;
    @ManyToOne
    public User user;
    @OneToMany
    public List<JobProposal> proposals;
}
