package com.beauty.backend.model;

import jakarta.persistence.*;

@Entity

public class Wishlist {

    @Id

    @GeneratedValue(strategy =
    GenerationType.IDENTITY)

    private Long id;

    private String userEmail;

    private String productTitle;

    private double productPrice;

    private String productImage;

    public Wishlist() {
    }

    public Wishlist(
    String userEmail,
    String productTitle,
    double productPrice,
    String productImage
    ){

        this.userEmail = userEmail;
        this.productTitle = productTitle;
        this.productPrice = productPrice;
        this.productImage = productImage;

    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(String productTitle) {
        this.productTitle = productTitle;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

}