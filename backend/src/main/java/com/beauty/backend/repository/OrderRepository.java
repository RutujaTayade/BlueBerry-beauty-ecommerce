package com.beauty.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beauty.backend.model.Order;

public interface OrderRepository
extends JpaRepository<Order, Long> {

    List<Order> findByUserEmail(
    String userEmail
    );

}