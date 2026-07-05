package com.ecommerce.ecommerce.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.dto.AuthResponse;
import com.ecommerce.ecommerce.model.User;
import com.ecommerce.ecommerce.model.enums.Role;
import com.ecommerce.ecommerce.repository.UserRepository;
import com.ecommerce.ecommerce.service.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
    origins = {
        "http://localhost:8081",
        "http://localhost:5173",
        "http://192.168.0.103:8081"
    },
    allowCredentials = "true"
)
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody User user) {

        Optional<User> existingUser =
                userRepository.findByEmail(user.getEmail().toLowerCase());

        if (existingUser.isPresent()) {
            return new AuthResponse(
                    null,
                    "Email already registered",
                    null,
                    null,
                    null,
                    null
            );
        }

        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        if (user.getBlocked() == null) {
            user.setBlocked(false);
        }

        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "User Registered Successfully",
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().toString()
        );
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody User loginUser) {

        Optional<User> optionalUser =
                userRepository.findByEmail(loginUser.getEmail().toLowerCase());

        if (optionalUser.isEmpty()) {
            return new AuthResponse(
                    null,
                    "User not found",
                    null,
                    null,
                    null,
                    null
            );
        }

        User user = optionalUser.get();

        if (user.getBlocked()) {
            return new AuthResponse(
                    null,
                    "User account is blocked",
                    null,
                    null,
                    null,
                    null
            );
        }

        if (!passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword()
        )) {
            return new AuthResponse(
                    null,
                    "Invalid Password",
                    null,
                    null,
                    null,
                    null
            );
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "Login Successful",
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getRole().toString()
        );
    }
}