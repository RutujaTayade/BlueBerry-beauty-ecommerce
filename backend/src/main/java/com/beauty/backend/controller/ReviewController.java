// package com.beauty.backend.controller;

// import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin(origins = "*")

// public class ReviewController {
// }


package com.beauty.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.beauty.backend.model.Review;
import com.beauty.backend.repository.ReviewRepository;

@RestController

@RequestMapping("/api/reviews")

@CrossOrigin(origins = "*")

public class ReviewController {

    @Autowired

    private ReviewRepository reviewRepository;

    @PostMapping

    public Review addReview(

    @RequestBody Review review){

        review.setReviewDate(
        LocalDateTime.now()
        );

        return reviewRepository.save(
        review
        );
    }

    @GetMapping("/{productId}")

    public List<Review> getReviews(

    @PathVariable Long productId){

        return reviewRepository
        .findByProductId(
        productId
        );
    }
}