package net.quarkify.user;

import net.quarkify.data.User;
import net.quarkify.security.TokenService;
import org.eclipse.microprofile.openapi.annotations.Operation;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.*;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    @Inject
    TokenService service;

    @POST
    @Path("/register")
    @Transactional
    @Operation(operationId = "register")
    @PermitAll
    public User register(User user) {
        user.persist(); //super simplified registration, no checks of uniqueness
        return user;
    }

    @GET
    @Path("/login")
    @Operation(operationId = "login")
    @PermitAll
    public String login(@QueryParam("login") String login, @QueryParam("password") String password) {
        User existingUser = User.find("name", login).firstResult();
        if(existingUser == null || !existingUser.password.equals(password)) {
            throw new WebApplicationException(Response.status(404).entity("No user found or password is incorrect").build());
        }
        return service.generateUserToken(existingUser.email, password);
    }
}
