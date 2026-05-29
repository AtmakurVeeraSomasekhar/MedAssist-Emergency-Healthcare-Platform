package com.emergencyapp.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "patients")
public class Patient {

    @Id
    private String id;

    private String name;
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String phone;
    private String bloodGroup;
    private String age;
    private String emergencyContact;
    private String medicalHistory;
    private String emergencyType;

    private String role;
    private String createdAt;

    public Patient() {
    }

    public Patient(
            String name,
            String phone,
            String emergencyType
    ) {
        this.name = name;
        this.phone = phone;
        this.emergencyType = emergencyType;
        this.role = "PATIENT";
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

    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(
            String password
    ) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone
    ) {
        this.phone = phone;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(
            String bloodGroup
    ) {
        this.bloodGroup = bloodGroup;
    }

    public String getAge() {
        return age;
    }

    public void setAge(
            String age
    ) {
        this.age = age;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(
            String emergencyContact
    ) {
        this.emergencyContact = emergencyContact;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(
            String medicalHistory
    ) {
        this.medicalHistory = medicalHistory;
    }

    public String getEmergencyType() {
        return emergencyType;
    }

    public void setEmergencyType(
            String emergencyType
    ) {
        this.emergencyType = emergencyType;
    }

    public String getRole() {
        return role;
    }

    public void setRole(
            String role
    ) {
        this.role = role;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            String createdAt
    ) {
        this.createdAt = createdAt;
    }
}