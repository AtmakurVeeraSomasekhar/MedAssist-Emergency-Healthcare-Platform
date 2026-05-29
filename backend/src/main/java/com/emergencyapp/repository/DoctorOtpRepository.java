package com.emergencyapp.repository;

import com.emergencyapp.model.DoctorOtp;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DoctorOtpRepository extends MongoRepository<DoctorOtp, String> {

    Optional<DoctorOtp> findTopByEmailOrderByExpiryTimeDesc(String email);
}