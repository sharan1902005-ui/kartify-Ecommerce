package com.ecommerce.ecommerce.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "wishlist",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "product_id"})
)
public class Wishlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Wishlist() {}

    public Wishlist(Long userId, Long productId) {
        this.userId    = userId;
        this.productId = productId;
    }

    public Long getId()                    { return id; }
    public void setId(Long id)             { this.id = id; }

    public Long getUserId()                { return userId; }
    public void setUserId(Long userId)     { this.userId = userId; }

    public Long getProductId()             { return productId; }
    public void setProductId(Long pid)     { this.productId = pid; }

    public LocalDateTime getCreatedAt()    { return createdAt; }
    public void setCreatedAt(LocalDateTime t) { this.createdAt = t; }
}
