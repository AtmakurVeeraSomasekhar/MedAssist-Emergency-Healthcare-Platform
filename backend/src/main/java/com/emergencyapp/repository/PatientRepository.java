package com.emergencyapp.repository;

import com.emergencyapp.entity.Patient;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PatientRepository
        extends MongoRepository<Patient, String> {

    Optional<Patient> findByEmail(
            String email
    );

    Optional<Patient> findByPhone(
            String phone
    );

    Optional<Patient> findByEmailOrPhone(
            String email,
            String phone
    );

    boolean existsByEmail(
            String email
    );
}