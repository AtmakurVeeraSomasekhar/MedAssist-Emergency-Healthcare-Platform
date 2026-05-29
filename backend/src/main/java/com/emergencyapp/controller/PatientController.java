package com.emergencyapp.controller;

import com.emergencyapp.entity.Patient;
import com.emergencyapp.repository.PatientRepository;
import com.emergencyapp.security.JwtUtil;

import org.springframework.http.HttpStatus;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public PatientController(
            PatientRepository patientRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.patientRepository =
                patientRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.jwtUtil =
                jwtUtil;
    }

    /*
     =========================
     REGISTER PATIENT
     Node route:
     POST /api/patients/register
     =========================
    */

    @PostMapping("/patients/register")
    public Map<String, Object> registerPatient(
            @RequestBody Patient patient
    ) {
        if (
                patient.getEmail() == null ||
                        patient.getEmail().isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        if (
                patient.getPassword() == null ||
                        patient.getPassword().isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password is required"
            );
        }

        if (
                patientRepository.existsByEmail(
                        patient.getEmail()
                )
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already exists"
            );
        }

        patient.setPassword(
                passwordEncoder.encode(
                        patient.getPassword()
                )
        );

        patient.setRole("PATIENT");
        patient.setCreatedAt(
                new Date().toString()
        );

        Patient savedPatient =
                patientRepository.save(patient);

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Patient Registered Successfully"
        );

        response.put(
                "patient",
                savedPatient
        );

        return response;
    }

    /*
     =========================
     PATIENT LOGIN
     Node route:
     POST /api/login
     =========================
    */

    @PostMapping("/login")
    public Map<String, Object> loginPatient(
            @RequestBody Map<String, String> loginData
    ) {
        String emailOrPhone =
                loginData.get("emailOrPhone");

        String password =
                loginData.get("password");

        if (
                emailOrPhone == null ||
                        emailOrPhone.isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email or phone is required"
            );
        }

        if (
                password == null ||
                        password.isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password is required"
            );
        }

        Patient patient =
                patientRepository
                        .findByEmailOrPhone(
                                emailOrPhone,
                                emailOrPhone
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Patient not found"
                                )
                        );

        if (
                !passwordEncoder.matches(
                        password,
                        patient.getPassword()
                )
        ) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid password"
            );
        }

        String role =
                patient.getRole() != null
                        ? patient.getRole()
                        : "PATIENT";

        String token =
                jwtUtil.generateToken(
                        patient.getId(),
                        patient.getEmail(),
                        role
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Login Successful"
        );

        response.put(
                "token",
                token
        );

        response.put(
                "patient",
                patient
        );

        return response;
    }

    /*
     =========================
     GET ALL PATIENTS
     Node route:
     GET /api/patients
     =========================
    */

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
}