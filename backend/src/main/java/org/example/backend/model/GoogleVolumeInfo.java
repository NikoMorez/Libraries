package org.example.backend.model;

import java.util.List;

public record GoogleVolumeInfo(String title, List<String> authors, String publishedDate, String description,
                               List<GoogleIndustryIdentifier> industryIdentifiers, GoogleImageLinks imageLinks) {
}
