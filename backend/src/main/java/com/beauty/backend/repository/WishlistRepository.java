// package com.beauty.backend.repository;

// import java.util.List;

// import org.springframework.data.jpa.repository.JpaRepository;

// import com.beauty.backend.model.Wishlist;

// public interface WishlistRepository
// extends JpaRepository<Wishlist, Long> {

//     List<Wishlist> findByUserEmail(
//     String userEmail
//     );

// }

package com.beauty.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beauty.backend.model.Wishlist;

public interface WishlistRepository
extends JpaRepository<Wishlist, Long>{

    List<Wishlist> findByUserEmail(
    String userEmail
    );
}