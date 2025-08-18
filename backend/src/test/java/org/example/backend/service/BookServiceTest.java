package org.example.backend.service;

import org.example.backend.model.Book;
import org.example.backend.repo.BookRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    private BookRepo bookRepo;
    private IdService idService;
    private BookService service;

    private Book book1;
    private Book book2;

    @BeforeEach
    void setUp() {
        this.bookRepo = mock(BookRepo.class);
        this.idService = mock(IdService.class);
        this.service = new BookService(bookRepo, idService);

        this.book1 = new Book("1",
                "Der Herr der Ringe",
                "J.R.R. Tolkien",
                "978-3-86680-192-9",
                "Ein episches Fantasy-Abenteuer",
                LocalDate.of(1954, 7, 29));

        this.book2 = new Book("2",
                "1984",
                "George Orwell",
                "978-0-452-28423-4",
                "Dystopischer Klassiker",
                LocalDate.of(1949, 6, 8));
    }

    @Test
    void testGetAllBooks_returnsAllBooks() {
        //GIVEN
        List<Book> response = List.of(book1, book2);
        when(bookRepo.findAll()).thenReturn(response);

        //WHEN
        List<Book> result = service.getAllBooks();

        //THEN
        assertEquals(response, result);
        assertEquals(2, result.size());
        assertTrue(result.contains(book1));
        assertTrue(result.contains(book2));

        verify(bookRepo).findAll();
        verifyNoMoreInteractions(bookRepo);
        verifyNoInteractions(idService);
    }

    @Test
    void testGetAllBooks_returnsEmptyList() {
        // GIVEN
        when(bookRepo.findAll()).thenReturn(List.of());

        // WHEN
        List<Book> result = service.getAllBooks();

        // THEN
        assertTrue(result.isEmpty());
        verify(bookRepo).findAll();
        verifyNoInteractions(idService);
    }
}