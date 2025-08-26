package org.example.backend.security;

import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Document(collection = "appUser")
public record AppUser(
        @Id String id,
        String username) {
}
