package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.model.Wishlist;
import com.ecommerce.ecommerce.repository.ProductRepository;
import com.ecommerce.ecommerce.repository.WishlistRepository;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin("*")
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    // ADD TO WISHLIST
    @PostMapping("/add")
    public Wishlist addToWishlist(@RequestBody Wishlist wishlist) {

        Optional<Product> product =
                productRepository.findById(wishlist.getProductId());

        if (product.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Optional<Wishlist> existingWishlist =
                wishlistRepository.findByUserIdAndProductId(
                        wishlist.getUserId(),
                        wishlist.getProductId()
                );

        if (existingWishlist.isPresent()) {
            return existingWishlist.get();
        }

        return wishlistRepository.save(wishlist);
    }

    // GET USER WISHLIST
    @GetMapping("/user/{userId}")
    public List<Wishlist> getUserWishlist(@PathVariable Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    // REMOVE FROM WISHLIST
    @DeleteMapping("/remove/{wishlistId}")
    public String removeFromWishlist(@PathVariable Long wishlistId) {

        Optional<Wishlist> wishlist =
                wishlistRepository.findById(wishlistId);

        if (wishlist.isEmpty()) {
            throw new RuntimeException("Wishlist item not found");
        }

        wishlistRepository.deleteById(wishlistId);

        return "Removed from wishlist";
    }
}