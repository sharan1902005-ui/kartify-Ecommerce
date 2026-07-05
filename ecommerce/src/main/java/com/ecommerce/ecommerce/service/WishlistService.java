package com.ecommerce.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ecommerce.ecommerce.dto.WishlistItemDTO;
import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.model.User;
import com.ecommerce.ecommerce.model.Wishlist;
import com.ecommerce.ecommerce.repository.ProductRepository;
import com.ecommerce.ecommerce.repository.UserRepository;
import com.ecommerce.ecommerce.repository.WishlistRepository;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    // ── Resolve userId from email (JWT subject) ──────────────────────────
    private Long resolveUserId(String email) {
        return userRepository.findByEmail(email)
                .map(User::getId)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }

    // ── GET all wishlist items for authenticated user ─────────────────────
    public List<WishlistItemDTO> getWishlist(String email) {
        Long userId = resolveUserId(email);

        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(w -> {
                    Product p = productRepository.findById(w.getProductId())
                            .orElse(null);
                    if (p == null) return null;
                    return new WishlistItemDTO(
                            w.getId(),
                            p.getId(),
                            p.getName(),
                            p.getDescription(),
                            p.getPrice(),
                            p.getStock(),
                            p.getImageUrl(),
                            p.getCategory(),
                            w.getCreatedAt()
                    );
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }

    // ── GET wishlist product IDs only (for fast UI sync) ─────────────────
    public List<Long> getWishlistProductIds(String email) {
        Long userId = resolveUserId(email);
        return wishlistRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(Wishlist::getProductId)
                .collect(Collectors.toList());
    }

    // ── ADD product to wishlist ───────────────────────────────────────────
    public WishlistItemDTO addToWishlist(String email, Long productId) {
        Long userId = resolveUserId(email);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found: " + productId));

        // Idempotent — return existing if already wishlisted
        Wishlist entry = wishlistRepository
                .findByUserIdAndProductId(userId, productId)
                .orElseGet(() -> wishlistRepository.save(new Wishlist(userId, productId)));

        return new WishlistItemDTO(
                entry.getId(),
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                product.getCategory(),
                entry.getCreatedAt()
        );
    }

    // ── REMOVE product from wishlist ──────────────────────────────────────
    @Transactional
    public void removeFromWishlist(String email, Long productId) {
        Long userId = resolveUserId(email);
        if (!wishlistRepository.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("Wishlist item not found");
        }
        wishlistRepository.deleteByUserIdAndProductId(userId, productId);
    }

    // ── CHECK if a product is wishlisted ──────────────────────────────────
    public boolean isWishlisted(String email, Long productId) {
        Long userId = resolveUserId(email);
        return wishlistRepository.existsByUserIdAndProductId(userId, productId);
    }

    // ── GET wishlist count ────────────────────────────────────────────────
    public long getWishlistCount(String email) {
        Long userId = resolveUserId(email);
        return wishlistRepository.countByUserId(userId);
    }
}
