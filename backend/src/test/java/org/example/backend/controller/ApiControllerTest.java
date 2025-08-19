package org.example.backend.controller;

import org.example.backend.model.Book;
import org.example.backend.repo.BookRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class ApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepo bookRepo;

    @BeforeEach
    void setUp() {
        Book book1 = new Book("1",
                "Der Herr der Ringe",
                "J.R.R. Tolkien",
                "978-3-86680-192-9",
                "Ein episches Fantasy-Abenteuer",
                LocalDate.of(1954, 7, 29));

        Book book2 = new Book("2",
                "1984",
                "George Orwell",
                "978-0-452-28423-4",
                "Dystopischer Klassiker",
                LocalDate.of(1949, 6, 8));

        bookRepo.save(book1);
        bookRepo.save(book2);

    }

    @Test
    void testGetAllBooks()  throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith("application/json"))
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].id", containsInAnyOrder("1", "2")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[?(@.id=='1')].title", hasItem("Der Herr der Ringe")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[?(@.id=='2')].author", hasItem("George Orwell")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[?(@.id=='1')].publicationDate", hasItem("1954-07-29")));
    }
}