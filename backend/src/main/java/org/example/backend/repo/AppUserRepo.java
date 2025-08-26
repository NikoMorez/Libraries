package org.example.backend.repo;

import org.example.backend.security.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepo extends MongoRepository<AppUser,String> {
}
