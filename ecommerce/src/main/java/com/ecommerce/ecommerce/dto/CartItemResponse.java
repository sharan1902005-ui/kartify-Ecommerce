package com.ecommerce.ecommerce.dto;

import com.ecommerce.ecommerce.model.Product;

public class CartItemResponse {

    private Long id;
    private Integer quantity;
    private Product product;

    public CartItemResponse() {}

    public CartItemResponse(Long id, Integer quantity, Product product) {
        this.id = id;
        this.quantity = quantity;
        this.product = product;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }
}
