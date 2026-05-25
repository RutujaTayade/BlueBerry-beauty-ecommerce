package com.beauty.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.beauty.backend.model.Cart;

import com.beauty.backend.repository.CartRepository;

@RestController

@RequestMapping("/api/cart")

@CrossOrigin(origins = "*")

public class CartController {

    @Autowired

    private CartRepository cartRepository;

    @PostMapping("/add")

    public Cart addToCart(

    @RequestBody Cart cart) {

        Cart existingCartItem =

        cartRepository

        .findByUserEmailAndProductTitle(

        cart.getUserEmail(),

        cart.getProductTitle()

        );

        if(existingCartItem != null){

            existingCartItem.setQuantity(

            existingCartItem.getQuantity() + 1

            );

            return cartRepository.save(
            existingCartItem
            );
        }

        return cartRepository.save(cart);
    }

    @GetMapping("/{email}")

    public List<Cart> getCartItems(

    @PathVariable String email) {

        return cartRepository
        .findByUserEmail(email);
    }

    @DeleteMapping("/remove/{id}")

    public String removeCartItem(

    @PathVariable Long id){

        cartRepository.deleteById(id);

        return "Item Removed";
    }

    @PutMapping("/increase/{id}")

    public Cart increaseQuantity(

    @PathVariable Long id){

        Cart cart =

        cartRepository
        .findById(id)
        .orElse(null);

        if(cart == null){

            return null;
        }

        cart.setQuantity(

        cart.getQuantity() + 1
        );

        return cartRepository.save(cart);
    }

    @PutMapping("/decrease/{id}")

    public Cart decreaseQuantity(

    @PathVariable Long id){

        Cart cart =

        cartRepository
        .findById(id)
        .orElse(null);

        if(cart == null){

            return null;
        }

        if(cart.getQuantity() > 1){

            cart.setQuantity(

            cart.getQuantity() - 1
            );

            return cartRepository.save(cart);
        }

        cartRepository.delete(cart);

        return null;
    }
}