package com.beauty.backend.model;

import jakarta.persistence.*;

@Entity

public class Product {

    @Id

    @GeneratedValue(strategy =
    GenerationType.IDENTITY)

    private Long id;

    private String title;

    private double price;

    private String image;

    private String category;

    @Column(length = 2000)

    private String description;

    private String brand;

    private double rating;

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(
    String title
    ){
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(
    double price
    ){
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(
    String image
    ){
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(
    String category
    ){
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(
    String description
    ){
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(
    String brand
    ){
        this.brand = brand;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(
    double rating
    ){
        this.rating = rating;
    }

}