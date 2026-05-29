package com.emergencyapp.controller;

import com.emergencyapp.model.Doctor;
import com.emergencyapp.model.DoctorOtp;
import com.emergencyapp.repository.DoctorOtpRepository;
import com.emergencyapp.repository.DoctorRepository;
import com.emergencyapp.security.JwtUtil;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    private final DoctorRepository doctorRepository;
    private final DoctorOtpRepository otpRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public DoctorController(
            DoctorRepository doctorRepository,
            DoctorOtpRepository otpRepository,
            JavaMailSender mailSender,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.doctorRepository = doctorRepository;
        this.otpRepository = otpRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(
            @RequestBody Map<String, String> data
    ) {
        String email = data.get("email");

        String otp = String.valueOf(
                100000 + new Random().nextInt(900000)
        );

        DoctorOtp doctorOtp = new DoctorOtp();
        doctorOtp.setEmail(email);
        doctorOtp.setOtp(otp);
        doctorOtp.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        doctorOtp.setVerified(false);

        otpRepository.save(doctorOtp);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Doctor Verification OTP");
        message.setText("Your Doctor Verification OTP is: " + otp);

        mailSender.send(message);

        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP sent to email");

        return response;
    }

    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(
            @RequestBody Map<String, String> data
    ) {
        String email = data.get("email");
        String otp = data.get("otp");

        DoctorOtp savedOtp = otpRepository
                .findTopByEmailOrderByExpiryTimeDesc(email)
                .orElseThrow(() ->
                        new RuntimeException("OTP not found")
                );

        if (savedOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        if (!savedOtp.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        savedOtp.setVerified(true);
        otpRepository.save(savedOtp);

        Map<String, String> response = new HashMap<>();
        response.put("message", "OTP verified successfully");

        return response;
    }

    @PostMapping("/register")
    public Doctor registerDoctor(
            @RequestBody Doctor doctor
    ) {
        DoctorOtp verifiedOtp = otpRepository
                .findTopByEmailOrderByExpiryTimeDesc(doctor.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Please verify email first")
                );

        if (!verifiedOtp.isVerified()) {
            throw new RuntimeException("Email OTP not verified");
        }

        doctor.setPassword(
                passwordEncoder.encode(doctor.getPassword())
        );

        doctor.setEmailVerified(true);
        doctor.setRole("DOCTOR");
        doctor.setVerificationStatus("PENDING");
        doctor.setOnlineStatus("Offline");

        return doctorRepository.save(doctor);
    }

    @PostMapping("/login")
    public Map<String, Object> loginDoctor(
            @RequestBody Map<String, String> loginData
    ) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        Doctor doctor = doctorRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        if (!passwordEncoder.matches(password, doctor.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!"APPROVED".equals(doctor.getVerificationStatus())) {
            throw new RuntimeException(
                    "Your account is under verification. Please wait for admin approval."
            );
        }

        String token = jwtUtil.generateToken(
                doctor.getId(),
                doctor.getEmail(),
                doctor.getRole()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("message", "Doctor login successful");
        response.put("doctor", doctor);
        response.put("token", token);

        return response;
    }

    @GetMapping("/pending")
    public List<Doctor> getPendingDoctors() {
        return doctorRepository
                .findByVerificationStatus("PENDING");
    }

    @PutMapping("/approve/{id}")
    public Doctor approveDoctor(
            @PathVariable String id
    ) {
        Doctor doctor = doctorRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found")
                );

        doctor.setVerificationStatus("APPROVED");

        return doctorRepository.save(doctor);
    }

    @PutMapping("/reject/{id}")
    public Doctor rejectDoctor(
            @PathVariable String id
    ) {
        Doctor doctor = doctorRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found")
                );

        doctor.setVerificationStatus("REJECTED");

        return doctorRepository.save(doctor);
    }

    @PutMapping("/status/{doctorId}")
    public Doctor updateDoctorStatus(
            @PathVariable String doctorId,
            @RequestBody Map<String, String> statusData
    ) {
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found")
                );

        doctor.setOnlineStatus(
                statusData.get("onlineStatus")
        );

        doctor.setLastSeen(
                new java.util.Date().toString()
        );

        return doctorRepository.save(doctor);
    }
}