package com.beauty.backend.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity

public class Review {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private Long productId;

    private String userEmail;

    private int rating;

    private String comment;

    private LocalDateTime reviewDate;

    public Review() {
    }

    // Generate Getters and Setters
}