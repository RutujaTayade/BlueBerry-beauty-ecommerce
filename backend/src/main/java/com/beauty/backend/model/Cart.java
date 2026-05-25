package com.beauty.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity

public class Cart {

    @Id

    @GeneratedValue(
    strategy = GenerationType.IDENTITY)

    private Long id;

    private String userEmail;

    private String productTitle;

    private double productPrice;

    private String productImage;

    private int quantity = 1;

    public Cart() {
    }

    public Cart(

    String userEmail,

    String productTitle,

    double productPrice,

    String productImage,

    int quantity) {

        this.userEmail = userEmail;

        this.productTitle = productTitle;

        this.productPrice = productPrice;

        this.productImage = productImage;

        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(
    String userEmail) {

        this.userEmail = userEmail;
    }

    public String getProductTitle() {
        return productTitle;
    }

    public void setProductTitle(
    String productTitle) {

        this.productTitle = productTitle;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(
    double productPrice) {

        this.productPrice = productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(
    String productImage) {

        this.productImage = productImage;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(
    int quantity) {

        this.quantity = quantity;
    }
}