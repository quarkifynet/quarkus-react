package net.quarkify.user;

import net.quarkify.data.User;
import org.eclipse.microprofile.openapi.annotations.Operation;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserResource {
    @GET
    @Path("/me")
    public User getCurrentUser() {
        throw new UnsupportedOperationException("Requires security");
    }

    @POST
    public User registerUser(User user) {
        user.persistAndFlush();
        return user;
    }
}
