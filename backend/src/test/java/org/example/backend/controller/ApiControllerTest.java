package org.example.backend.controller;

import org.example.backend.model.Book;
import org.example.backend.repo.BookRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.ArrayList;

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
                LocalDate.of(1954, 7, 29),
                "",
                "",
                new ArrayList<>(),
                false,
                false,
                null
        );

        Book book2 = new Book("2",
                "1984",
                "George Orwell",
                "978-0-452-28423-4",
                "Dystopischer Klassiker",
                LocalDate.of(1949, 6, 8),
                "",
                "",
                new ArrayList<>(),
                false,
                false,
                null
        );

        bookRepo.save(book1);
        bookRepo.save(book2);

    }

    @Test
    void testGetAllBooks() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentTypeCompatibleWith("application/json"))
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].id", containsInAnyOrder("1", "2")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[?(@.id=='1')].title", hasItem("Der Herr der Ringe")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[?(@.id=='2')].author", hasItem("George Orwell")))
                .andExpect(MockMvcResultMatchers.jsonPath("$[?(@.id=='1')].publicationDate", hasItem("1954-07-29")));
    }

    @Test
    void testAddBook() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                  {
                      "title": "Die unendliche Geschichte",
                      "author": "Michael Ende",
                      "isbn": "978-3-522-20260-2",
                      "description": "Ein phantastisches Abenteuer in der Welt Phantásien",
                      "publicationDate": "1979-09-01"
                  }
                """
                        ))
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                          {
                                              "title": "Die unendliche Geschichte",
                                              "author": "Michael Ende",
                                              "isbn": "978-3-522-20260-2",
                                              "description": "Ein phantastisches Abenteuer in der Welt Phantásien",
                                              "publicationDate": "1979-09-01"
                                          }
                                        """
                ))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id")
                        .isNotEmpty());
    }

    @Test
    void testGetBookById_found() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Der Herr der Ringe"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.author").value("J.R.R. Tolkien"));
    }

    @Test
    void testUpdateBook_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/api/books/2")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "title": "1984 (Updated)",
                                "author": "George Orwell",
                                "isbn": "978-0-452-28423-4",
                                "description": "Überarbeitete Beschreibung",
                                "publicationDate": "1949-06-08"
                            }
                        """))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value("2"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("1984 (Updated)"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Überarbeitete Beschreibung"));
    }

    @Test
    void testDeleteBook_success() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/2"))
                .andExpect(MockMvcResultMatchers.status().isNoContent());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/2"))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void testGetAllBooks_returns204WhenEmpty() throws Exception {
        bookRepo.deleteAll();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/books"))
                .andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void testSearchGoogleBooks_returnsListOfBooks() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/search?query=myrie_zange_symmetrie_schneeflocken"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                  [
                      {
                          "title": "Myrie Zange",
                          "author": "M. Skalabyrinth",
                          "isbn": "9789403740478",
                          "description": "",
                          "publicationDate": "2024-04-25",
                          "smallThumbnail": "",
                          "thumbnail": ""
                      },
                      {
                          "title": "Die Symmetrie der Schneeflocken",
                          "author": "Karla Byrinth",
                          "isbn": "",
                          "description": "",
                          "publicationDate": "2019-01-01",
                          "smallThumbnail": "",
                          "thumbnail": ""
                      }
                  ]
                  """));
    }
}