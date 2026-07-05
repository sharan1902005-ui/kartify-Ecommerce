package com.ecommerce.ecommerce.controller;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.PasswordResetToken;
import com.ecommerce.ecommerce.model.User;
import com.ecommerce.ecommerce.repository.PasswordResetTokenRepository;
import com.ecommerce.ecommerce.repository.UserRepository;

@RestController
@RequestMapping("/api/password")
@CrossOrigin("*")
public class PasswordResetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // FORGOT PASSWORD
    @PostMapping("/forgot")
    public String forgotPassword(@RequestParam String email) {

        Optional<User> optionalUser =
                userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        String token = UUID.randomUUID().toString();

        Optional<PasswordResetToken> existing =
                tokenRepository.findByEmail(email);

        PasswordResetToken resetToken =
                existing.orElse(new PasswordResetToken());

        resetToken.setEmail(email);
        resetToken.setToken(token);
        resetToken.setExpiryTime(
                LocalDateTime.now().plusMinutes(15)
        );

        tokenRepository.save(resetToken);

        return token;
    }

    // RESET PASSWORD
    @PostMapping("/reset")
    public String resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword
    ) {
        Optional<PasswordResetToken> optionalToken =
                tokenRepository.findByToken(token);

        if (optionalToken.isEmpty()) {
            throw new RuntimeException("Invalid token");
        }

        PasswordResetToken resetToken = optionalToken.get();

        if (resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        Optional<User> optionalUser =
                userRepository.findByEmail(resetToken.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

        tokenRepository.delete(resetToken);

        return "Password reset successful";
    }
}