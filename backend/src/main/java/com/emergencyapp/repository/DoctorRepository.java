package com.emergencyapp.repository;

import com.emergencyapp.model.Doctor;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DoctorRepository
        extends MongoRepository<Doctor, String> {

    Optional<Doctor> findByEmail(String email);

    Optional<Doctor> findByEmailAndPassword(
            String email,
            String password
    );

    List<Doctor> findByVerificationStatus(
            String verificationStatus
    );
}