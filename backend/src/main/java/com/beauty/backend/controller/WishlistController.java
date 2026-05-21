package com.beauty.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beauty.backend.model.Wishlist;
import com.beauty.backend.repository.WishlistRepository;

@RestController

@RequestMapping("/api/wishlist")

@CrossOrigin("*")

@CrossOrigin(origins = "*")

public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @PostMapping("/add")

    public Wishlist addWishlist(
    @RequestBody Wishlist wishlist
    ){

        return wishlistRepository.save(
        wishlist
        );

    }

    @GetMapping("/{email}")

    public List<Wishlist> getWishlistItems(
    @PathVariable String email
    ){

        return wishlistRepository
        .findByUserEmail(email);

    }

    @DeleteMapping("/remove/{id}")

    public String removeWishlistItem(
    @PathVariable Long id
    ){

        wishlistRepository.deleteById(id);

        return "Wishlist Item Removed";

    }

}