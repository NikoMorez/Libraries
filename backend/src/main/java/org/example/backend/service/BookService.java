package org.example.backend.service;

import org.example.backend.model.Book;
import org.example.backend.model.BookDTO;
import org.example.backend.repo.BookRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Book> getBookById(String id) {
        return bookRepo.findById(id);
    }

    public Book addBook(BookDTO book) {
        String newId = idService.randomId();
        boolean bookmark = false;
        boolean favorite = false;
        Double rating = null;
        return bookRepo.save(new Book(
                newId, book.title(), book.author(), book.isbn(), book.description(), book.publicationDate(),
                book.smallThumbnail(), book.thumbnail(), book.categories(), bookmark, favorite, rating
        ));
    }

    public Optional<Book> updateBook(String id, BookDTO bookDto) {
        return bookRepo.findById(id).map(existing -> {
            Book updated = new Book(
                    id,
                    bookDto.title(),
                    bookDto.author(),
                    bookDto.isbn(),
                    bookDto.description(),
                    bookDto.publicationDate(),
                    bookDto.smallThumbnail(),
                    bookDto.thumbnail(),
                    bookDto.categories(),
                    bookDto.bookmark(),
                    bookDto.favorite(),
                    bookDto.rating()

            );
            return bookRepo.save(updated);
        });
    }

    public Optional<Book> deleteBook(String id) {
        return bookRepo.findById(id).map(book -> {
            bookRepo.delete(book);
            return book;
        });
    }
}
