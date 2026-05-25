package com.beauty.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beauty.backend.model.Cart;

public interface CartRepository
extends JpaRepository<Cart, Long> {

    List<Cart> findByUserEmail(
    String userEmail
    );

    Cart findByUserEmailAndProductTitle(
String userEmail,
String productTitle
);

}