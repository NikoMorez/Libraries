package org.example.backend.service;

import org.example.backend.model.BookDTO;
import org.example.backend.model.GoogleIndustryIdentifier;
import org.example.backend.model.GoogleItem;
import org.example.backend.model.GoogleResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleRequestService {

    private final RestClient restClient;

    public GoogleRequestService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://www.googleapis.com/books/v1/volumes").build();
    }

    public List<BookDTO> searchGoogleBooks(String query) {
        GoogleResponse response = restClient.get().uri("?q="+query).retrieve().body(GoogleResponse.class);
        List<GoogleItem> entries = new ArrayList<>();
        if (response != null) {response.items().stream().limit(10).forEach(entries::add);}
        List<BookDTO> books = new ArrayList<>();
        for (GoogleItem item : entries) {
            String isbn13 = "";
            for (GoogleIndustryIdentifier identifier: item.volumeInfo().industryIdentifiers()){
                if (identifier.type().equals("ISBN_13")){
                    isbn13 = identifier.identifier();
                }
            }
            LocalDate publicationDate = LocalDate.of(0,1,1);
            try {
                if(item.volumeInfo().publishedDate().length() == 10) {
                    publicationDate = LocalDate.parse(item.volumeInfo().publishedDate());
                }else if(item.volumeInfo().publishedDate().length() == 4){
                    int year = Integer.parseInt(item.volumeInfo().publishedDate());
                    publicationDate = LocalDate.of(year,1,1);
                }
            }catch (Exception ignored){}
            books.add(new BookDTO(
                    item.volumeInfo() != null && item.volumeInfo().title() != null ? item.volumeInfo().title() : "",
                    item.volumeInfo() != null && item.volumeInfo().authors() != null && !item.volumeInfo().authors().isEmpty() && item.volumeInfo().authors().getFirst() != null ? item.volumeInfo().authors().getFirst() : "",
                    isbn13,
                    item.volumeInfo() != null && item.volumeInfo().description() != null ? item.volumeInfo().description() : "",
                    publicationDate,
                    item.volumeInfo() != null && item.volumeInfo().imageLinks() != null && item.volumeInfo().imageLinks().smallThumbnail() != null ? item.volumeInfo().imageLinks().smallThumbnail() : "",
                    item.volumeInfo() != null && item.volumeInfo().imageLinks() != null && item.volumeInfo().imageLinks().thumbnail() != null ? item.volumeInfo().imageLinks().thumbnail() : ""
            ));
        }
        return books;
    }
}
