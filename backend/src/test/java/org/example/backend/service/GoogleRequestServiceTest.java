package org.example.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureMockRestServiceServer
class GoogleRequestServiceTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private MockRestServiceServer mockServer;

    @Test
    void searchGoogleBooks_shouldReturnListOfBooks_whenQueryBanane() throws Exception {
        mockServer.expect(requestTo("https://www.googleapis.com/books/v1/volumes?q=Banane"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess("""
                        {
                            "items": [
                                {
                                    "volumeInfo": {
                                        "title": "Geschichte der Konsumgesellschaft",
                                        "authors": [
                                            "Wolfgang König",
                                            "Max Mustermann"
                                        ],
                                        "publishedDate": "2000",
                                        "description": "Unsere Zeit wird weit mehr durch Konsumtion als durch Produktion geprägt...",
                                        "industryIdentifiers": [
                                            {
                                                "type": "ISBN_13",
                                                "identifier": "9783515076500"
                                            }
                                        ],
                                        "imageLinks": {
                                            "smallThumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                            "thumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                                        },
                                        "categories": [
                                            "Business & Economics"
                                        ]
                                    }
                                }
                            ]
                        }""", MediaType.APPLICATION_JSON));
        mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/api/books/search?query=Banane"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [{
                          "title": "Geschichte der Konsumgesellschaft",
                          "author": "Wolfgang König, Max Mustermann",
                          "isbn": "9783515076500",
                          "description": "Unsere Zeit wird weit mehr durch Konsumtion als durch Produktion geprägt...",
                          "publicationDate": "2000-01-01",
                          "smallThumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                          "thumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                          "categories": [
                                      "Business & Economics"
                                  ]
                        }]"""
                ));
    }

    @Test
    void searchGoogleBooks_shouldReturnEmptyStringsAndNull_whenEntriesAreEmpty() throws Exception {
        mockServer.expect(requestTo("https://www.googleapis.com/books/v1/volumes?q=Banane"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess("""
                        {
                            "items": [
                                {
                                    "volumeInfo": {
                                        "title": "Geschichte der Konsumgesellschaft",
                                        "publishedDate": "",
                                        "description": "Unsere Zeit wird weit mehr durch Konsumtion als durch Produktion geprägt...",
                                        "industryIdentifiers": [
                                            {
                                                "type": "ISBN_13",
                                                "identifier": "9783515076500"
                                            }
                                        ],
                                        "imageLinks": {
                                            "smallThumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                                            "thumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                                        },
                                        "categories": [
                                            "Business & Economics"
                                        ]
                                    }
                                }
                            ]
                        }""", MediaType.APPLICATION_JSON));
        mockMvc.perform(MockMvcRequestBuilders.get("http://localhost:8080/api/books/search?query=Banane"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [{
                          "title": "Geschichte der Konsumgesellschaft",
                          "author": "",
                          "isbn": "9783515076500",
                          "description": "Unsere Zeit wird weit mehr durch Konsumtion als durch Produktion geprägt...",
                          "smallThumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                          "thumbnail": "http://books.google.com/books/content?id=WSoEqc3-xlYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                          "categories": [
                                      "Business & Economics"
                                  ]
                        }]"""
                ));
    }
}