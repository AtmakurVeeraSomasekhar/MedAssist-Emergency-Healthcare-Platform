package com.emergencyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "doctors")
public class Doctor {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String password;
    private String specialization;
    private String experience;
    private String hospital;
    private String licenseNumber;

    private String mbbsCertificateUrl;
    private String mdCertificateUrl;
    private String aadhaarUrl;
    private String profilePhotoUrl;

    private String verificationStatus = "PENDING";
    private String onlineStatus = "Offline";
    private String lastSeen;

    private String role = "DOCTOR";
    private boolean emailVerified = false;

    public Doctor() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getMbbsCertificateUrl() {
        return mbbsCertificateUrl;
    }

    public void setMbbsCertificateUrl(String mbbsCertificateUrl) {
        this.mbbsCertificateUrl = mbbsCertificateUrl;
    }

    public String getMdCertificateUrl() {
        return mdCertificateUrl;
    }

    public void setMdCertificateUrl(String mdCertificateUrl) {
        this.mdCertificateUrl = mdCertificateUrl;
    }

    public String getAadhaarUrl() {
        return aadhaarUrl;
    }

    public void setAadhaarUrl(String aadhaarUrl) {
        this.aadhaarUrl = aadhaarUrl;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public String getVerificationStatus() {
        return verificationStatus;
    }

    public void setVerificationStatus(String verificationStatus) {
        this.verificationStatus = verificationStatus;
    }

    public String getOnlineStatus() {
        return onlineStatus;
    }

    public void setOnlineStatus(String onlineStatus) {
        this.onlineStatus = onlineStatus;
    }

    public String getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(String lastSeen) {
        this.lastSeen = lastSeen;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
}