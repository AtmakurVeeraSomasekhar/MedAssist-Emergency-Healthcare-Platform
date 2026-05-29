package com.emergencyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "hospitals")
public class Hospital {

    @Id
    private String id;

    private String name;
    private String address;
    private String phone;

    private Double rating;
    private String distance;

    private Boolean emergencyAvailable;

    private String image;

    private String latitude;
    private String longitude;

    private Date createdAt;
    private Date updatedAt;

    public Hospital() {
        this.rating = 4.0;
        this.emergencyAvailable = true;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(
            String id
    ) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(
            String name
    ) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(
            String address
    ) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone
    ) {
        this.phone = phone;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(
            Double rating
    ) {
        this.rating = rating;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(
            String distance
    ) {
        this.distance = distance;
    }

    public Boolean getEmergencyAvailable() {
        return emergencyAvailable;
    }

    public void setEmergencyAvailable(
            Boolean emergencyAvailable
    ) {
        this.emergencyAvailable = emergencyAvailable;
    }

    public String getImage() {
        return image;
    }

    public void setImage(
            String image
    ) {
        this.image = image;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(
            String latitude
    ) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(
            String longitude
    ) {
        this.longitude = longitude;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            Date createdAt
    ) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(
            Date updatedAt
    ) {
        this.updatedAt = updatedAt;
    }
}