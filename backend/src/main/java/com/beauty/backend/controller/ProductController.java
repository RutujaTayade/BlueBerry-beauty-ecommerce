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

import com.beauty.backend.model.Product;
import com.beauty.backend.repository.ProductRepository;

@RestController

@RequestMapping("/api/products")

//@CrossOrigin("*")

@CrossOrigin(origins = "*")

public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping

    public List<Product> getProducts(){

        return productRepository.findAll();

    }

    @GetMapping("/{id}")

    public Product getSingleProduct(
    @PathVariable Long id
    ){

        return productRepository
        .findById(id)
        .orElse(null);

    }

    @PostMapping

    public Product addProduct(
    @RequestBody Product product
    ){

        return productRepository
        .save(product);

    }

    @DeleteMapping("/{id}")

    public String deleteProduct(
    @PathVariable Long id
    ){

        productRepository.deleteById(id);

        return "Product Deleted";

    }

}