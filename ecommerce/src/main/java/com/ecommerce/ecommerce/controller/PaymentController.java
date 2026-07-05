package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.Payment;
import com.ecommerce.ecommerce.model.User;
import com.ecommerce.ecommerce.repository.PaymentRepository;
import com.ecommerce.ecommerce.repository.UserRepository;
import com.ecommerce.ecommerce.service.EmailService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/create")
    public Payment createPayment(@RequestBody Payment payment) {

        payment.setStatus("PENDING");

        return paymentRepository.save(payment);
    }

    @PutMapping("/success/{id}")
    public Payment paymentSuccess(@PathVariable Long id) {

        Optional<Payment> optionalPayment =
                paymentRepository.findById(id);

        if (optionalPayment.isEmpty()) {
            throw new RuntimeException("Payment not found");
        }

        Payment payment = optionalPayment.get();
        payment.setStatus("SUCCESS");

        Payment savedPayment =
                paymentRepository.save(payment);

        Optional<User> user =
                userRepository.findById(payment.getUserId());

        if (user.isPresent()) {
            emailService.sendEmail(
                    user.get().getEmail(),
                    "Payment Successful",
                    "Your payment was successful.\nPayment ID: "
                            + savedPayment.getId()
            );
        }

        return savedPayment;
    }

    @PutMapping("/failure/{id}")
    public Payment paymentFailure(@PathVariable Long id) {

        Optional<Payment> optionalPayment =
                paymentRepository.findById(id);

        if (optionalPayment.isEmpty()) {
            throw new RuntimeException("Payment not found");
        }

        Payment payment = optionalPayment.get();
        payment.setStatus("FAILED");

        return paymentRepository.save(payment);
    }

    @GetMapping("/user/{userId}")
    public List<Payment> getUserPayments(@PathVariable Long userId) {
        return paymentRepository.findByUserId(userId);
    }

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}