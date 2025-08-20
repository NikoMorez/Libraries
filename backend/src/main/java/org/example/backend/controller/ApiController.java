package org.example.backend.controller;


import org.example.backend.model.Book;
import org.example.backend.model.BookDTO;
import org.example.backend.service.BookService;
import org.example.backend.service.GoogleRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class ApiController {

    private final BookService bookService;
    private final GoogleRequestService googleRequestService;

    public ApiController(BookService bookService, GoogleRequestService googleRequestService) {
        this.bookService = bookService;
        this.googleRequestService = googleRequestService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();

        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return bookService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody BookDTO bookDto) {
        Book savedBook = bookService.addBook(bookDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody BookDTO bookDto) {
        return bookService.updateBook(id, bookDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        return bookService.deleteBook(id)
                .map(b -> ResponseEntity.noContent().<Void>build())
                .orElse(ResponseEntity.notFound().build());

    }

    @GetMapping("/search")
    public ResponseEntity<List<BookDTO>> searchGoogleBooks(@RequestParam String query) {
        List<BookDTO> books = googleRequestService.searchGoogleBooks(query);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }
}
