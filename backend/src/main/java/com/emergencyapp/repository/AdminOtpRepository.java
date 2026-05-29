package com.emergencyapp.repository;

import com.emergencyapp.model.AdminOtp;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminOtpRepository
        extends MongoRepository<AdminOtp, String> {

    Optional<AdminOtp> findTopByEmailAndPurposeOrderByCreatedAtDesc(
            String email,
            String purpose
    );
}