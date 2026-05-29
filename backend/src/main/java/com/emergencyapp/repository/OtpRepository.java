package com.emergencyapp.repository;

import com.emergencyapp.model.Otp;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OtpRepository
        extends MongoRepository<Otp, String> {

    Optional<Otp> findTopByEmailAndPurposeOrderByCreatedAtDesc(
            String email,
            String purpose
    );

    List<Otp> findByEmail(
            String email
    );
}