package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Review;
import com.ecommerce.ecommerce.repository.ReviewRepository;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin("*")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // ADD REVIEW
    @PostMapping("/add")
    public Review addReview(@RequestBody Review review) {

        if (review.getRating() < 1 || review.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        return reviewRepository.save(review);
    }

    // GET PRODUCT REVIEWS
    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProduct(@PathVariable Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    // DELETE REVIEW
    @DeleteMapping("/{reviewId}")
    public String deleteReview(@PathVariable Long reviewId) {

        Optional<Review> review =
                reviewRepository.findById(reviewId);

        if (review.isEmpty()) {
            throw new RuntimeException("Review not found");
        }

        reviewRepository.deleteById(reviewId);

        return "Review deleted successfully";
    }
}