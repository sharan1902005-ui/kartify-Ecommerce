package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.dto.CartItemResponse;
import com.ecommerce.ecommerce.model.Cart;
import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.repository.CartRepository;
import com.ecommerce.ecommerce.repository.ProductRepository;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    // ADD TO CART
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {

        Optional<Product> product =
                productRepository.findById(cart.getProductId());

        if (product.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        if (cart.getQuantity() <= 0) {
            throw new RuntimeException("Invalid quantity");
        }

        List<Cart> userCart =
                cartRepository.findByUserId(cart.getUserId());

        for (Cart existing : userCart) {
            if (existing.getProductId().equals(cart.getProductId())) {
                existing.setQuantity(
                        existing.getQuantity() + cart.getQuantity()
                );
                return cartRepository.save(existing);
            }
        }

        return cartRepository.save(cart);
    }

    // GET USER CART
    @GetMapping("/user/{userId}")
    public List<CartItemResponse> getCartByUser(@PathVariable Long userId) {
        List<Cart> cartItems = cartRepository.findByUserId(userId);
        List<CartItemResponse> response = new java.util.ArrayList<>();
        for (Cart cart : cartItems) {
            Optional<Product> product = productRepository.findById(cart.getProductId());
            if (product.isPresent()) {
                response.add(new CartItemResponse(cart.getId(), cart.getQuantity(), product.get()));
            }
        }
        return response;
    }

    // UPDATE QUANTITY
    @PutMapping("/update/{cartId}")
    public Cart updateCartQuantity(
            @PathVariable Long cartId,
            @RequestBody Cart updatedCart
    ) {
        Optional<Cart> optionalCart =
                cartRepository.findById(cartId);

        if (optionalCart.isEmpty()) {
            throw new RuntimeException("Cart item not found");
        }

        Cart cart = optionalCart.get();

        if (updatedCart.getQuantity() <= 0) {
            throw new RuntimeException("Invalid quantity");
        }

        cart.setQuantity(updatedCart.getQuantity());

        return cartRepository.save(cart);
    }

    // REMOVE ITEM
    @DeleteMapping("/remove/{cartId}")
    public String removeFromCart(@PathVariable Long cartId) {

        Optional<Cart> cart =
                cartRepository.findById(cartId);

        if (cart.isEmpty()) {
            throw new RuntimeException("Cart item not found");
        }

        cartRepository.deleteById(cartId);

        return "Item removed from cart";
    }

    // CLEAR CART
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId) {
        cartRepository.deleteAllByUserId(userId);
        return "Cart cleared successfully";
    }

    // TOTAL PRICE
    @GetMapping("/total/{userId}")
    public Double getCartTotal(@PathVariable Long userId) {

        List<Cart> cartItems =
                cartRepository.findByUserId(userId);

        double total = 0;

        for (Cart cart : cartItems) {
            Optional<Product> product =
                    productRepository.findById(cart.getProductId());

            if (product.isPresent()) {
                total +=
                        product.get().getPrice()
                        * cart.getQuantity();
            }
        }

        return total;
    }
}