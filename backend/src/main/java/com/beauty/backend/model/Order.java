package com.beauty.backend.model;

import jakarta.persistence.*;

@Entity

@Table(name = "orders_table")

public class Order {

    @Id

    @GeneratedValue(strategy =
    GenerationType.IDENTITY)

    private Long id;

    private String userEmail;

    private String fullName;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private double totalAmount;

    public Order() {
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(
    String userEmail
    ){
        this.userEmail = userEmail;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(
    String fullName
    ){
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(
    String address
    ){
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(
    String city
    ){
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(
    String state
    ){
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(
    String pincode
    ){
        this.pincode = pincode;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
    double totalAmount
    ){
        this.totalAmount = totalAmount;
    }

}