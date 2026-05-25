package com.beauty.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beauty.backend.model.Order;
import com.beauty.backend.repository.OrderRepository;

@RestController

@RequestMapping("/api/orders")

@CrossOrigin(origins = "*")

public class OrderController {

    @Autowired

    private OrderRepository orderRepository;

    @PostMapping

    public Order placeOrder(

    @RequestBody Order order){

        return orderRepository.save(order);
    }

    @GetMapping

    public List<Order> getAllOrders(){

        return orderRepository.findAll();
    }

    @GetMapping("/{email}")

    public List<Order> getOrders(

    @PathVariable String email){

        return orderRepository
        .findByUserEmail(email);
    }

    @PutMapping("/status/{id}")

    public Order updateOrderStatus(

    @PathVariable Long id,

    @RequestBody Order updatedOrder){

        Order order =

        orderRepository
        .findById(id)
        .orElse(null);

        if(order == null){

            return null;
        }

        order.setStatus(
        updatedOrder.getStatus()
        );

        return orderRepository.save(order);
    }
}