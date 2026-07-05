package com.ecommerce.ecommerce.controller;

import com.ecommerce.ecommerce.service.RazorpayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:8081"
})
public class RazorpayController {

    @Autowired
    private RazorpayService razorpayService;

    @PostMapping("/create-order")
    public String createOrder(
            @RequestParam int amount
    ) throws Exception {

        return razorpayService.createOrder(amount);
    }
}