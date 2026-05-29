package com.beauty.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beauty.backend.jwt.JwtUtil;
import com.beauty.backend.model.User;
import com.beauty.backend.repository.UserRepository;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins = "*")

public class AuthController {

    @Autowired

    private UserRepository userRepository;

    @Autowired

    private PasswordEncoder passwordEncoder;

    @Autowired

    private JwtUtil jwtUtil;

    @PostMapping("/register")

    public String registerUser(

    @RequestBody User user){

        if(userRepository.existsByEmail(
        user.getEmail())){

            return "Email Already Exists";
        }

        user.setPassword(

        passwordEncoder.encode(
        user.getPassword()
        ));

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

        boolean passwordMatches =

        passwordEncoder.matches(

        user.getPassword(),

        existingUser.getPassword()
        );

        if(passwordMatches){

            String token =

            jwtUtil.generateToken(
            existingUser.getEmail()
            );

            return java.util.Map.of(

                    "message",
                    "Login Successful",

                    "token",
                    token,

                    "email",
                    existingUser.getEmail());
        }

        return "Invalid Password";
    }
}