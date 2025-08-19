package org.example.backend.model;

import java.time.LocalDate;
import java.util.List;

public record GoogleVolumeInfo(String title, String[] authors, LocalDate publishedDate, String description,
                               List<GoogleIndustryIdentifier> industryIdentifiers, GoogleImageLinks imageLinks) {
}
