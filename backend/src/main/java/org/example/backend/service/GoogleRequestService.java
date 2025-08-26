package org.example.backend.service;

import org.example.backend.model.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class GoogleRequestService {

    private final RestClient restClient;
    private final IdService idService;

    public GoogleRequestService(RestClient.Builder restClientBuilder, IdService idService) {
        this.restClient = restClientBuilder
                .baseUrl("https://www.googleapis.com/books/v1/volumes").build();
        this.idService = idService;
    }

    public List<Book> searchGoogleBooks(String query) {
        GoogleResponse response = restClient.get().uri("?q="+query).retrieve().body(GoogleResponse.class);
        List<GoogleItem> entries = new ArrayList<>();
        if (response != null && response.items() != null) {response.items().stream().limit(12).forEach(entries::add);}
        List<Book> books = new ArrayList<>();
        for (GoogleItem item : entries) {
            String isbn13 = getIsbn13(item);
            LocalDate publicationDate = getLocalDate(item);
            String authors = getAuthors(item);
            books.add(new Book(
                    idService.randomId(),
                    item.volumeInfo() != null && item.volumeInfo().title() != null ? item.volumeInfo().title() : "",
                    authors,
                    isbn13,
                    item.volumeInfo() != null && item.volumeInfo().description() != null ? item.volumeInfo().description() : "",
                    publicationDate,
                    item.volumeInfo() != null && item.volumeInfo().imageLinks() != null && item.volumeInfo().imageLinks().smallThumbnail() != null ? item.volumeInfo().imageLinks().smallThumbnail() : "",
                    item.volumeInfo() != null && item.volumeInfo().imageLinks() != null && item.volumeInfo().imageLinks().thumbnail() != null ? item.volumeInfo().imageLinks().thumbnail() : "",
                    item.volumeInfo() != null && item.volumeInfo().categories() != null ? item.volumeInfo().categories() : new ArrayList<>(),
                    false
            ));
        }
        return books;
    }

    private static String getIsbn13(GoogleItem item) {
        String isbn13 = "";
        if (item.volumeInfo() != null && item.volumeInfo().industryIdentifiers() != null) {
            for (GoogleIndustryIdentifier identifier : item.volumeInfo().industryIdentifiers()) {
                if (identifier.type().equals("ISBN_13")) {
                    isbn13 = identifier.identifier();
                }
            }
        }
        return isbn13;
    }

    private static LocalDate getLocalDate(GoogleItem item) {
        // default case, in case there is no date-entry
        LocalDate publicationDate = null;
        try {
            if(item.volumeInfo().publishedDate().length() == 10) {
                publicationDate = LocalDate.parse(item.volumeInfo().publishedDate());
            }else if(item.volumeInfo().publishedDate().length() == 4){
                int year = Integer.parseInt(item.volumeInfo().publishedDate());
                publicationDate = LocalDate.of(year,1,1);
            }
        // Exception ignored, because fallback case is already defined above.
        }catch (Exception ignored){}
        return publicationDate;
    }

    private static String getAuthors(GoogleItem item) {
        if (item.volumeInfo() != null && item.volumeInfo().authors() != null) {
            return String.join(", ", item.volumeInfo().authors());
        }
        return "";
    }
}
