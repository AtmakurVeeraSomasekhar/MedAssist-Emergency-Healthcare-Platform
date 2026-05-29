package com.emergencyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "otps")
public class Otp {

    @Id
    private String id;

    private String email;
    private String otp;

    private String purpose;

    private Boolean verified;

    private LocalDateTime createdAt;
    private LocalDateTime expiryTime;

    public Otp() {
        this.verified = false;
        this.createdAt = LocalDateTime.now();
        this.expiryTime = LocalDateTime.now().plusMinutes(5);
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

    public Boolean getVerified() {
        return verified;
    }

    public void setVerified(
            Boolean verified
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