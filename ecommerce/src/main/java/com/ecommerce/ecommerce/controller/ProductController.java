package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8081",
    "http://192.168.0.103:8081",
    "https://kartify-ecommerce.vercel.app"
})
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // ADD PRODUCT
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    // GET ALL PRODUCTS
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET PRODUCT BY ID
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        Optional<Product> product =
                productRepository.findById(id);

        if (product.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        return product.get();
    }

    // SEARCH PRODUCTS
    @GetMapping("/search/{keyword}")
    public List<Product> searchProducts(
            @PathVariable String keyword
    ) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }

    // FILTER BY CATEGORY
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(
            @PathVariable String category
    ) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // UPDATE PRODUCT
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product updatedProduct
    ) {
        Optional<Product> optionalProduct =
                productRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Product product = optionalProduct.get();

        product.setName(updatedProduct.getName());
        product.setDescription(updatedProduct.getDescription());
        product.setPrice(updatedProduct.getPrice());
        product.setStock(updatedProduct.getStock());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setCategory(updatedProduct.getCategory());

        return productRepository.save(product);
    }

    // DELETE PRODUCT
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {

        Optional<Product> product =
                productRepository.findById(id);

        if (product.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }
}
