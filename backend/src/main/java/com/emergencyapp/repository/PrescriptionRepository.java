package com.emergencyapp.repository;

import com.emergencyapp.model.Prescription;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PrescriptionRepository
        extends MongoRepository<Prescription, String> {

    List<Prescription> findByPatientId(String patientId);

    List<Prescription> findByRoomId(String roomId);
}