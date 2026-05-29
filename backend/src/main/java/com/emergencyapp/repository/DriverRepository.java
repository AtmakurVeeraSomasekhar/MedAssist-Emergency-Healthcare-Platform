package com.emergencyapp.repository;

import com.emergencyapp.model.Driver;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DriverRepository
        extends MongoRepository<Driver, String> {

    Optional<Driver> findByEmail(
            String email
    );

    boolean existsByEmail(
            String email
    );

    List<Driver> findByVerificationStatus(
            String verificationStatus
    );

    List<Driver> findByOnlineStatus(
            String onlineStatus
    );
}