package net.quarkify.data;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class JobProposal extends PanacheEntity {
    public String content;
    @ManyToOne
    public User user;
    @ManyToOne
    @JoinColumn(name = "job_post_id")
    public JobPost jobPost;
}
