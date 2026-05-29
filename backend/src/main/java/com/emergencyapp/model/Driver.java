package com.emergencyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "drivers")
public class Driver {

    @Id
    private String id;

    private String fullName;
    private String email;
    private String password;
    private String phone;

    private String ambulanceNumber;
    private String vehicleRcNumber;
    private String drivingLicenseNumber;
    private String experience;
    private String serviceProvider;

    private String drivingLicenseUrl;
    private String rcBookUrl;
    private String profilePhotoUrl;

    private String verificationStatus = "PENDING";
    private String onlineStatus = "Offline";
    private String role = "AMBULANCE";

    private String currentLatitude;
    private String currentLongitude;
    private String lastSeen;

    public Driver() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAmbulanceNumber() { return ambulanceNumber; }
    public void setAmbulanceNumber(String ambulanceNumber) { this.ambulanceNumber = ambulanceNumber; }

    public String getVehicleRcNumber() { return vehicleRcNumber; }
    public void setVehicleRcNumber(String vehicleRcNumber) { this.vehicleRcNumber = vehicleRcNumber; }

    public String getDrivingLicenseNumber() { return drivingLicenseNumber; }
    public void setDrivingLicenseNumber(String drivingLicenseNumber) { this.drivingLicenseNumber = drivingLicenseNumber; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getServiceProvider() { return serviceProvider; }
    public void setServiceProvider(String serviceProvider) { this.serviceProvider = serviceProvider; }

    public String getDrivingLicenseUrl() { return drivingLicenseUrl; }
    public void setDrivingLicenseUrl(String drivingLicenseUrl) { this.drivingLicenseUrl = drivingLicenseUrl; }

    public String getRcBookUrl() { return rcBookUrl; }
    public void setRcBookUrl(String rcBookUrl) { this.rcBookUrl = rcBookUrl; }

    public String getProfilePhotoUrl() { return profilePhotoUrl; }
    public void setProfilePhotoUrl(String profilePhotoUrl) { this.profilePhotoUrl = profilePhotoUrl; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public String getOnlineStatus() { return onlineStatus; }
    public void setOnlineStatus(String onlineStatus) { this.onlineStatus = onlineStatus; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCurrentLatitude() { return currentLatitude; }
    public void setCurrentLatitude(String currentLatitude) { this.currentLatitude = currentLatitude; }

    public String getCurrentLongitude() { return currentLongitude; }
    public void setCurrentLongitude(String currentLongitude) { this.currentLongitude = currentLongitude; }

    public String getLastSeen() { return lastSeen; }
    public void setLastSeen(String lastSeen) { this.lastSeen = lastSeen; }
}