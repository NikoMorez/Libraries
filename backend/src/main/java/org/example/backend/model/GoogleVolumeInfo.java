package org.example.backend.model;

import java.util.List;

public record GoogleVolumeInfo(String title, String[] authors, String publishedDate, String description,
                               List<GoogleIndustryIdentifier> industryIdentifier, GoogleImageLinks imageLinks) {
}
