package com.emergencyapp.repository;

import com.emergencyapp.model.EmergencyRequest;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmergencyRequestRepository
        extends MongoRepository<EmergencyRequest, String> {

    List<EmergencyRequest> findByStatus(
            String status
    );

    List<EmergencyRequest> findByPatientId(
            String patientId
    );

    List<EmergencyRequest> findByPhone(
            String phone
    );

    List<EmergencyRequest> findByDriverId(
            String driverId
    );

    List<EmergencyRequest> findByDoctorId(
            String doctorId
    );

    List<EmergencyRequest> findByDoctorIdAndStatus(
            String doctorId,
            String status
    );
}