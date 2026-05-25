package com.beauty.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name = "orders_table")

public class Order {

    @Id

    @GeneratedValue(strategy =
    GenerationType.IDENTITY)

    private Long id;

    private String userEmail;

    private String fullName;

    private String email;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String pincode;

    private double totalAmount;

    private String status = "Pending";

    public Order() {
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(
    String userEmail){

        this.userEmail = userEmail;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(
    String fullName){

        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
    String email){

        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(
    String phone){

        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(
    String address){

        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(
    String city){

        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(
    String state){

        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(
    String pincode){

        this.pincode = pincode;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
    double totalAmount){

        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
    String status){

        this.status = status;
    }
}