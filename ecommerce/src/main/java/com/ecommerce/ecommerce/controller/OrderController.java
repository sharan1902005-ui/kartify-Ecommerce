package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Order;
import com.ecommerce.ecommerce.model.Product;
import com.ecommerce.ecommerce.repository.OrderRepository;
import com.ecommerce.ecommerce.repository.ProductRepository;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/place")
    public Order placeOrder(@RequestBody Order order) {
        System.out.println("ORDER RECEIVED = " + order.getUserId());
System.out.println("PRODUCT = " + order.getProductId());
System.out.println("QTY = " + order.getQuantity());
        Optional<Product> product =
                productRepository.findById(order.getProductId());

        if (product.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Product foundProduct = product.get();

        if (order.getQuantity() <= 0) {
            throw new RuntimeException("Invalid quantity");
        }

        if (foundProduct.getStock() < order.getQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        double total =
                foundProduct.getPrice() * order.getQuantity();

        foundProduct.setStock(
                foundProduct.getStock() - order.getQuantity()
        );

        productRepository.save(foundProduct);

        order.setTotalPrice(total);
        order.setStatus("PLACED");
        System.out.println("SAVING USER ID = " + order.getUserId());
        return orderRepository.save(order);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PutMapping("/status/{orderId}")
    public Order updateOrderStatus(
            @PathVariable Long orderId,
            @RequestBody Order updatedOrder
    ) {
        Optional<Order> optionalOrder =
                orderRepository.findById(orderId);

        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Order not found");
        }

        Order order = optionalOrder.get();
        order.setStatus(updatedOrder.getStatus());

        return orderRepository.save(order);
    }

    @DeleteMapping("/cancel/{orderId}")
    public String cancelOrder(@PathVariable Long orderId) {

        Optional<Order> optionalOrder =
                orderRepository.findById(orderId);

        if (optionalOrder.isEmpty()) {
            throw new RuntimeException("Order not found");
        }

        Order order = optionalOrder.get();

        if ("CANCELLED".equals(order.getStatus())) {
            return "Order already cancelled";
        }

        Optional<Product> optionalProduct =
                productRepository.findById(order.getProductId());

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            product.setStock(
                    product.getStock() + order.getQuantity()
            );

            productRepository.save(product);
        }

        order.setStatus("CANCELLED");
        orderRepository.save(order);

        return "Order cancelled successfully";
    }
}