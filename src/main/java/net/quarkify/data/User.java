package net.quarkify.data;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class User extends PanacheEntity {
    public String name;
    @OneToMany
    public List<JobPost> posts;
    @OneToMany
    public List<JobProposal> proposals;

}
