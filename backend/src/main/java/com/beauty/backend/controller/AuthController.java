package com.beauty.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beauty.backend.model.User;
import com.beauty.backend.repository.UserRepository;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired

    private UserRepository userRepository;

    @PostMapping("/register")

    public String registerUser(

    @RequestBody User user){

        User existingUser =

        userRepository.findByEmail(
        user.getEmail()
        );

        if(existingUser != null){

            return "Email already exists";
        }

        userRepository.save(user);

        return "Registration Successful";
    }

    @PostMapping("/login")

    public Object loginUser(

    @RequestBody User user){

        User existingUser =

        userRepository.findByEmail(
        user.getEmail()
        );

        if(existingUser == null){

            return "User not found";
        }

        if(existingUser.getPassword()

        .equals(user.getPassword())){

            return java.util.Map.of(

            "message",
            "Login Successful",


            "email",
            existingUser.getEmail()
            );
        }

        return "Invalid Password";
    }
}