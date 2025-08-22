package org.example.backend.service;

import org.example.backend.model.Book;
import org.example.backend.model.BookDTO;
import org.example.backend.repo.BookRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    private BookRepo bookRepo;
    private IdService idService;
    private BookService service;

    private Book book1;
    private Book book2;

    private Book book3;
    private BookDTO bookDTO3;

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
                LocalDate.of(1954, 7, 29),
                "",
                "",
                new ArrayList<>());

        this.book2 = new Book("2",
                "1984",
                "George Orwell",
                "978-0-452-28423-4",
                "Dystopischer Klassiker",
                LocalDate.of(1949, 6, 8),
                "",
                "",
                new ArrayList<>());

        this.book3 = new Book("3",
                "Die unendliche Geschichte",
                "Michael Ende",
                "978-3-522-20260-2",
                "Ein phantastisches Abenteuer in der Welt Phantásien",
                LocalDate.of(1979, 9, 1),
                "",
                "",
                new ArrayList<>());

        this.bookDTO3 = new BookDTO("Die unendliche Geschichte",
                "Michael Ende",
                "978-3-522-20260-2",
                "Ein phantastisches Abenteuer in der Welt Phantásien",
                LocalDate.of(1979, 9, 1),
                "",
                "",
                new ArrayList<>());
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

    @Test
    void testGetBookById_returnsBook() {
        // GIVEN
        when(bookRepo.findById("2")).thenReturn(Optional.of(this.book2));

        // WHEN
        Optional<Book> result = service.getBookById("2");

        // THEN
        assertTrue(result.isPresent());
        assertEquals(book2, result.get());
        verify(bookRepo).findById("2");
        verifyNoMoreInteractions(bookRepo);
        verifyNoInteractions(idService);
    }

    @Test
    void testGetBookById_returnsNull() {
        // GIVEN
        when(bookRepo.findById("100")).thenReturn(Optional.empty());

        // WHEN
        Optional<Book> result = service.getBookById("100");

        // THEN
        assertTrue(result.isEmpty());
        verify(bookRepo).findById("100");
        verifyNoInteractions(idService);
    }

    @Test
    void testAddBook_returnsBook() {
        // GIVEN
        when(idService.randomId()).thenReturn("3");
        when(bookRepo.save(any(Book.class))).thenReturn(this.book3);

        // WHEN
        Book result = service.addBook(bookDTO3);

        // THEN
        assertEquals(book3, result);
        verify(idService, times(1)).randomId();
        verify(bookRepo, times(1)).save(any(Book.class));
        verify(bookRepo, never()).findById("3");
    }

    @Test
    void updateBook_returnsBook() {
        // GIVEN
        when(bookRepo.findById("3")).thenReturn(Optional.of(this.book3));
        when(bookRepo.save(any(Book.class))).thenReturn(this.book3);

        // WHEN
        Optional<Book> result = service.updateBook("3", bookDTO3);

        // THEN
        assertEquals(Optional.of(book3), result);
        verifyNoInteractions(idService);
        verify(bookRepo, times(1)).save(any(Book.class));
        verify(bookRepo, times(1)).findById("3");
    }

    @Test
    void updateBook_returnsEmpty_whenNotExists() {
        // GIVEN
        when(bookRepo.findById("999")).thenReturn(Optional.empty());

        // WHEN
        Optional<Book> result = service.updateBook("999", bookDTO3);

        // THEN
        assertTrue(result.isEmpty());
        verify(bookRepo).findById("999");
        verify(bookRepo, never()).save(any(Book.class));
        verifyNoInteractions(idService);
    }

    @Test
    void deleteBook_returnsBook() {
        // GIVEN
        when(bookRepo.findById("3")).thenReturn(Optional.of(this.book3));

        // WHEN
        Optional<Book> result = service.deleteBook("3");

        // THEN
        assertEquals(Optional.of(book3), result);
        verifyNoInteractions(idService);
        verify(bookRepo, times(1)).findById("3");
        verify(bookRepo, times(1)).delete(this.book3);
    }

    @Test
    void deleteBook_returnsEmpty_whenNotExists() {
        // GIVEN
        when(bookRepo.findById("999")).thenReturn(Optional.empty());

        // WHEN
        Optional<Book> result = service.deleteBook("999");

        // THEN
        assertTrue(result.isEmpty());
        verify(bookRepo).findById("999");
        verify(bookRepo, never()).delete(any(Book.class));
        verifyNoInteractions(idService);
    }
}