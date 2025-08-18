package org.example.backend.model;

import lombok.With;

import java.time.LocalDate;

@With
public record BookDTO(
        String title,
        String author,
        String isbn,
        String description,
        LocalDate publicationDate
) {

}