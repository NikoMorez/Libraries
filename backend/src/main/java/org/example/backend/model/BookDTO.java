package org.example.backend.model;

import lombok.With;

import java.time.LocalDate;
import java.util.List;

@With
public record BookDTO(
        String title,
        String author,
        String isbn,
        String description,
        LocalDate publicationDate,
        String smallThumbnail,
        String thumbnail,
        List<String> categories,
        Boolean bookmark
) {

}