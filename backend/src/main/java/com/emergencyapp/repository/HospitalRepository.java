package com.emergencyapp.repository;

import com.emergencyapp.model.Hospital;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HospitalRepository
        extends MongoRepository<Hospital, String> {

    List<Hospital> findByEmergencyAvailable(
            Boolean emergencyAvailable
    );
}