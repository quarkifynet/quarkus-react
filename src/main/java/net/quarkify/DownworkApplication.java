package net.quarkify;

import org.eclipse.microprofile.openapi.annotations.Components;
import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;

import javax.ws.rs.core.Application;

@OpenAPIDefinition(
        info = @Info(
                title = "Downwork API",
                version = "1.0.0"
        ),
        components = @Components(
                securitySchemes = {
                        @SecurityScheme(
                                securitySchemeName = "bearerAuth",
                                type = SecuritySchemeType.HTTP,
                                scheme = "bearer",
                                bearerFormat = "JWT"
                        )
                }
        ),
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
public class DownworkApplication extends Application {
}
