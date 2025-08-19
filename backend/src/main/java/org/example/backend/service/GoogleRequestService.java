package org.example.backend.service;

import org.example.backend.model.GoogleResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GoogleRequestService {

    private final RestClient restClient;

    public GoogleRequestService(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder
                .baseUrl("https://www.googleapis.com/books/v1/volumes").build();
    }

    public GoogleResponse searchGoogleBooks(String query) {
        return restClient.get().uri("?"+query).retrieve().body(GoogleResponse.class);
    }
}
