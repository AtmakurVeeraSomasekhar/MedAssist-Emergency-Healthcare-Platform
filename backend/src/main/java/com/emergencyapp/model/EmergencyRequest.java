package com.emergencyapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "emergency_requests")
public class EmergencyRequest {

    @Id
    private String id;

    private String patientId;
    private String patientName;
    private String phone;

    private String location;
    private String emergencyType;
    private String symptoms;
    private String severity;
    private String distance;

    private String hospital;
    private String hospitalName;

    private String doctorId;
    private String roomId;

    private String driverId;
    private String driverName;
    private String driverPhone;
    private String ambulanceNumber;

    private String driverLatitude;
    private String driverLongitude;

    private String status;

    private String createdAt;
    private String updatedAt;

    public EmergencyRequest() {
        this.status = "Pending";
        String now = new java.util.Date().toString();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public String getId() {
        return id;
    }

    public void setId(
            String id
    ) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(
            String patientId
    ) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(
            String patientName
    ) {
        this.patientName = patientName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(
            String phone
    ) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(
            String location
    ) {
        this.location = location;
    }

    public String getEmergencyType() {
        return emergencyType;
    }

    public void setEmergencyType(
            String emergencyType
    ) {
        this.emergencyType = emergencyType;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(
            String symptoms
    ) {
        this.symptoms = symptoms;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(
            String severity
    ) {
        this.severity = severity;
    }

    public String getDistance() {
        return distance;
    }

    public void setDistance(
            String distance
    ) {
        this.distance = distance;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(
            String hospital
    ) {
        this.hospital = hospital;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(
            String hospitalName
    ) {
        this.hospitalName = hospitalName;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(
            String doctorId
    ) {
        this.doctorId = doctorId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(
            String roomId
    ) {
        this.roomId = roomId;
    }

    public String getDriverId() {
        return driverId;
    }

    public void setDriverId(
            String driverId
    ) {
        this.driverId = driverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(
            String driverName
    ) {
        this.driverName = driverName;
    }

    public String getDriverPhone() {
        return driverPhone;
    }

    public void setDriverPhone(
            String driverPhone
    ) {
        this.driverPhone = driverPhone;
    }

    public String getAmbulanceNumber() {
        return ambulanceNumber;
    }

    public void setAmbulanceNumber(
            String ambulanceNumber
    ) {
        this.ambulanceNumber = ambulanceNumber;
    }

    public String getDriverLatitude() {
        return driverLatitude;
    }

    public void setDriverLatitude(
            String driverLatitude
    ) {
        this.driverLatitude = driverLatitude;
    }

    public String getDriverLongitude() {
        return driverLongitude;
    }

    public void setDriverLongitude(
            String driverLongitude
    ) {
        this.driverLongitude = driverLongitude;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status
    ) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            String createdAt
    ) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(
            String updatedAt
    ) {
        this.updatedAt = updatedAt;
    }
}