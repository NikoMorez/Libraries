package org.example.backend.service;

import org.example.backend.model.Book;
import org.example.backend.repo.BookRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepo bookRepo;
    private final IdService idService;

    public BookService(BookRepo bookRepo, IdService idService) {
        this.bookRepo = bookRepo;
        this.idService = idService;
    }

    public List<Book> getAllBooks() {
        return bookRepo.findAll();
    }
}
