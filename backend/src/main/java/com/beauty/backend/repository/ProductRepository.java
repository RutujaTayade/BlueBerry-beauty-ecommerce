package com.beauty.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beauty.backend.model.Product;

public interface ProductRepository
extends JpaRepository<Product, Long> {

}