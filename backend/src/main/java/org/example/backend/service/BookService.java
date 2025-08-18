package org.example.backend.service;

import org.example.backend.model.Book;
import org.example.backend.model.BookDTO;
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

    public Book getBookById(String id) {
        return bookRepo.findById(id).orElse(null);
    }

    public Book addBook(BookDTO book) {
        String newId = idService.randomId();
        bookRepo.save(new Book(
                newId, book.title(), book.author(), book.isbn(), book.description(), book.publicationDate()
        ));
        return bookRepo.findById(newId).orElse(null);
    }

    public Book updateBook(String id, BookDTO book) {
        bookRepo.save(new Book(
                id, book.title(), book.author(), book.isbn(), book.description(), book.publicationDate()
        ));
        return bookRepo.findById(id).orElse(null);
    }

    public Book deleteBook(String id) {
        Book bookToDelete = bookRepo.findById(id).orElse(null);
        bookRepo.deleteById(id);
        return bookToDelete;
    }
}
