package com.ecommerce.ecommerce.dto;

import java.time.LocalDateTime;

public class WishlistItemDTO {

    private Long wishlistId;
    private Long productId;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String imageUrl;
    private String category;
    private LocalDateTime addedAt;

    public WishlistItemDTO() {}

    public WishlistItemDTO(
            Long wishlistId,
            Long productId,
            String name,
            String description,
            Double price,
            Integer stock,
            String imageUrl,
            String category,
            LocalDateTime addedAt
    ) {
        this.wishlistId  = wishlistId;
        this.productId   = productId;
        this.name        = name;
        this.description = description;
        this.price       = price;
        this.stock       = stock;
        this.imageUrl    = imageUrl;
        this.category    = category;
        this.addedAt     = addedAt;
    }

    public Long getWishlistId()              { return wishlistId; }
    public void setWishlistId(Long id)       { this.wishlistId = id; }

    public Long getProductId()               { return productId; }
    public void setProductId(Long id)        { this.productId = id; }

    public String getName()                  { return name; }
    public void setName(String name)         { this.name = name; }

    public String getDescription()           { return description; }
    public void setDescription(String d)     { this.description = d; }

    public Double getPrice()                 { return price; }
    public void setPrice(Double price)       { this.price = price; }

    public Integer getStock()                { return stock; }
    public void setStock(Integer stock)      { this.stock = stock; }

    public String getImageUrl()              { return imageUrl; }
    public void setImageUrl(String url)      { this.imageUrl = url; }

    public String getCategory()              { return category; }
    public void setCategory(String cat)      { this.category = cat; }

    public LocalDateTime getAddedAt()        { return addedAt; }
    public void setAddedAt(LocalDateTime t)  { this.addedAt = t; }
}
