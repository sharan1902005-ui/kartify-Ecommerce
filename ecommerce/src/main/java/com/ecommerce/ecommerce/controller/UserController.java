package com.ecommerce.ecommerce.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.ecommerce.model.User;
import com.ecommerce.ecommerce.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/search/{keyword}")
    public List<User> searchUsers(@PathVariable String keyword) {

        List<User> usersByName =
                userRepository.findByNameContainingIgnoreCase(keyword);

        if (!usersByName.isEmpty()) {
            return usersByName;
        }

        return userRepository.findByEmailContainingIgnoreCase(keyword);
    }

    @PutMapping("/block/{id}")
    public User blockUser(@PathVariable Long id) {

        Optional<User> optionalUser =
                userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        user.setBlocked(true);

        return userRepository.save(user);
    }

    @PutMapping("/unblock/{id}")
    public User unblockUser(@PathVariable Long id) {

        Optional<User> optionalUser =
                userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        user.setBlocked(false);

        return userRepository.save(user);
    }
}