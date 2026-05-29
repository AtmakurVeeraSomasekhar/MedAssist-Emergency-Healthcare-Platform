

package com.emergencyapp.controller;

import com.emergencyapp.model.Hospital;
import com.emergencyapp.repository.HospitalRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "http://localhost:3000")
public class HospitalController {

    private final HospitalRepository hospitalRepository;

    public HospitalController(
            HospitalRepository hospitalRepository
    ) {
        this.hospitalRepository =
                hospitalRepository;
    }

    /*
     =========================
     GET ALL HOSPITALS
     Node route:
     GET /api/hospitals
     =========================
    */

    @GetMapping
    public List<Hospital> getAllHospitals() {
        return hospitalRepository.findAll();
    }

    /*
     =========================
     ADD HOSPITAL
     Extra useful API for admin/testing
     =========================
    */

    @PostMapping
    public Hospital addHospital(
            @RequestBody Hospital hospital
    ) {
        return hospitalRepository.save(hospital);
    }

    /*
     =========================
     GET EMERGENCY AVAILABLE HOSPITALS
     =========================
    */

    @GetMapping("/emergency")
    public List<Hospital> getEmergencyHospitals() {
        return hospitalRepository
                .findByEmergencyAvailable(true);
    }
}