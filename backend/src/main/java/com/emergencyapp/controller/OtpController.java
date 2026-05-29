package com.emergencyapp.controller;

import com.emergencyapp.entity.Patient;
import com.emergencyapp.model.Otp;
import com.emergencyapp.repository.OtpRepository;
import com.emergencyapp.repository.PatientRepository;

import org.springframework.http.HttpStatus;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:3000")
public class OtpController {

    private final OtpRepository otpRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    private final SecureRandom secureRandom =
            new SecureRandom();

    public OtpController(
            OtpRepository otpRepository,
            PatientRepository patientRepository,
            PasswordEncoder passwordEncoder,
            JavaMailSender mailSender
    ) {
        this.otpRepository =
                otpRepository;

        this.patientRepository =
                patientRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.mailSender =
                mailSender;
    }

    private String generateOtp() {
        return String.valueOf(
                100000 +
                        secureRandom.nextInt(900000)
        );
    }

    private void sendOtpEmail(
            String email,
            String otp
    ) {
        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        message.setSubject(
                "Emergency App OTP Verification"
        );

        message.setText(
                "Your OTP Code is: "
                        + otp
                        + "\n\nThis OTP is valid for 5 minutes."
                        + "\n\nPlease do not share this OTP with anyone."
        );

        mailSender.send(message);
    }

    /*
     =========================
     SEND OTP
     Node route:
     POST /api/otp/send-otp
     =========================
    */

    @PostMapping("/send-otp")
    public Map<String, String> sendOtp(
            @RequestBody Map<String, String> data
    ) {
        String email =
                data.get("email");

        if (
                email == null ||
                        email.isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        String otp =
                generateOtp();

        otpRepository.deleteAll(
                otpRepository.findByEmail(email)
        );

        Otp otpRecord =
                new Otp();

        otpRecord.setEmail(email);
        otpRecord.setOtp(otp);
        otpRecord.setPurpose("PATIENT_OTP");
        otpRecord.setVerified(false);
        otpRecord.setCreatedAt(
                LocalDateTime.now()
        );
        otpRecord.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );

        otpRepository.save(otpRecord);

        try {

            sendOtpEmail(
                    email,
                    otp
            );

        } catch (Exception error) {

            error.printStackTrace();

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "OTP Send Failed. Check Gmail SMTP settings."
            );
        }

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "OTP Sent Successfully"
        );

        return response;
    }

    /*
     =========================
     VERIFY OTP
     Node route:
     POST /api/otp/verify-otp
     =========================
    */

    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(
            @RequestBody Map<String, String> data
    ) {
        String email =
                data.get("email");

        String otp =
                data.get("otp");

        if (
                email == null ||
                        otp == null
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email and OTP are required"
            );
        }

        Otp savedOtp =
                otpRepository
                        .findTopByEmailAndPurposeOrderByCreatedAtDesc(
                                email,
                                "PATIENT_OTP"
                        )
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST,
                                        "Invalid OTP"
                                )
                        );

        if (
                savedOtp.getExpiryTime()
                        .isBefore(LocalDateTime.now())
        ) {
            otpRepository.deleteAll(
                    otpRepository.findByEmail(email)
            );

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "OTP Expired"
            );
        }

        if (
                !savedOtp.getOtp().equals(otp)
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid OTP"
            );
        }

        savedOtp.setVerified(true);
        otpRepository.save(savedOtp);

        otpRepository.deleteAll(
                otpRepository.findByEmail(email)
        );

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "OTP Verified Successfully"
        );

        return response;
    }

    /*
     =========================
     RESET PASSWORD
     Node route:
     POST /api/otp/reset-password
     =========================
    */

    @PostMapping("/reset-password")
    public Map<String, String> resetPassword(
            @RequestBody Map<String, String> data
    ) {
        String email =
                data.get("email");

        String newPassword =
                data.get("newPassword");

        if (
                email == null ||
                        email.isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        if (
                newPassword == null ||
                        newPassword.isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "New password is required"
            );
        }

        Patient patient =
                patientRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Patient not found"
                                )
                        );

        patient.setPassword(
                passwordEncoder.encode(
                        newPassword
                )
        );

        patientRepository.save(patient);

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Password Reset Successful"
        );

        return response;
    }
}