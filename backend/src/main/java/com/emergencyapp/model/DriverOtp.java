package com.emergencyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "driver_otps")
public class DriverOtp {

    @Id
    private String id;

    private String email;
    private String otp;
    private String purpose;

    private boolean verified = false;

    private LocalDateTime createdAt;
    private LocalDateTime expiryTime;

    public DriverOtp() {
    }

    public String getId() {
        return id;
    }

    public void setId(
            String id
    ) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(
            String otp
    ) {
        this.otp = otp;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(
            String purpose
    ) {
        this.purpose = purpose;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(
            boolean verified
    ) {
        this.verified = verified;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(
            LocalDateTime expiryTime
    ) {
        this.expiryTime = expiryTime;
    }
}