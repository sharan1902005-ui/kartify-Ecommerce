package com.ecommerce.ecommerce.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ecommerce.ecommerce.dto.WishlistItemDTO;
import com.ecommerce.ecommerce.service.WishlistService;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    // ── GET /api/wishlist  — full enriched list ───────────────────────────
    @GetMapping
    public ResponseEntity<?> getWishlist(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        List<WishlistItemDTO> items = wishlistService.getWishlist(principal.getName());
        return ResponseEntity.ok(items);
    }

    // ── GET /api/wishlist/ids  — lightweight product-id list ─────────────
    @GetMapping("/ids")
    public ResponseEntity<?> getWishlistIds(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        return ResponseEntity.ok(wishlistService.getWishlistProductIds(principal.getName()));
    }

    // ── GET /api/wishlist/count ───────────────────────────────────────────
    @GetMapping("/count")
    public ResponseEntity<?> getWishlistCount(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        return ResponseEntity.ok(Map.of("count", wishlistService.getWishlistCount(principal.getName())));
    }

    // ── POST /api/wishlist/{productId}  — add ─────────────────────────────
    @PostMapping("/{productId}")
    public ResponseEntity<?> addToWishlist(
            @PathVariable Long productId,
            Principal principal
    ) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        try {
            WishlistItemDTO item = wishlistService.addToWishlist(principal.getName(), productId);
            return ResponseEntity.status(HttpStatus.CREATED).body(item);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // ── DELETE /api/wishlist/{productId}  — remove ────────────────────────
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromWishlist(
            @PathVariable Long productId,
            Principal principal
    ) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Authentication required"));
        }
        try {
            wishlistService.removeFromWishlist(principal.getName(), productId);
            return ResponseEntity.ok(Map.of("message", "Removed from wishlist"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // ── GET /api/wishlist/check/{productId} ───────────────────────────────
    @GetMapping("/check/{productId}")
    public ResponseEntity<?> checkWishlisted(
            @PathVariable Long productId,
            Principal principal
    ) {
        if (principal == null) {
            return ResponseEntity.ok(Map.of("wishlisted", false));
        }
        boolean result = wishlistService.isWishlisted(principal.getName(), productId);
        return ResponseEntity.ok(Map.of("wishlisted", result));
    }

    // ── Legacy endpoints (backward compat) ───────────────────────────────
    @PostMapping("/add")
    public ResponseEntity<?> legacyAdd(@RequestBody com.ecommerce.ecommerce.model.Wishlist body) {
        // Delegates to repository directly for backward compat
        return ResponseEntity.status(HttpStatus.GONE)
                .body(Map.of("error", "Use POST /api/wishlist/{productId} with JWT"));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> legacyGetByUser(@PathVariable Long userId) {
        return ResponseEntity.status(HttpStatus.GONE)
                .body(Map.of("error", "Use GET /api/wishlist with JWT"));
    }
}
