package com.emergencyapp.repository;

import com.emergencyapp.model.DriverOtp;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DriverOtpRepository
        extends MongoRepository<DriverOtp, String> {

    Optional<DriverOtp> findTopByEmailAndPurposeOrderByCreatedAtDesc(
            String email,
            String purpose
    );
}