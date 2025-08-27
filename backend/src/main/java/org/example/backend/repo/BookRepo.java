package org.example.backend.repo;

import org.example.backend.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepo extends MongoRepository<Book,String> {
    List<Book> findByFavorite(Boolean favorite);
}
