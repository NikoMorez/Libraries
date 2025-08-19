package org.example.backend.controller;


import org.example.backend.model.Book;
import org.example.backend.model.BookDTO;
import org.example.backend.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class ApiController {

    private final BookService bookService;

    public ApiController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    public Book addBook(@RequestBody BookDTO book) {
        return bookService.addBook(book);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody BookDTO book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public Book deleteBook(@PathVariable String id) {
        return bookService.deleteBook(id);
    }
}
