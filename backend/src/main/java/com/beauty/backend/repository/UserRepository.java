package com.beauty.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beauty.backend.model.User;

public interface UserRepository
extends JpaRepository<User, Long> {

    User findByEmail(String email);

}