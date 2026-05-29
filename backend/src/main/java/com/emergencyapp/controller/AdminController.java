package com.emergencyapp.controller;

import com.emergencyapp.model.Admin;
import com.emergencyapp.model.AdminOtp;
import com.emergencyapp.repository.AdminOtpRepository;
import com.emergencyapp.repository.AdminRepository;
import com.emergencyapp.security.JwtUtil;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminRepository adminRepository;
    private final AdminOtpRepository adminOtpRepository;
    private final JavaMailSender mailSender;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${admin.invite.code}")
    private String adminInviteCode;

    public AdminController(
            AdminRepository adminRepository,
            AdminOtpRepository adminOtpRepository,
            JavaMailSender mailSender,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.adminRepository = adminRepository;
        this.adminOtpRepository = adminOtpRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    private String generateOtp() {
        return String.valueOf(
                100000 + new Random().nextInt(900000)
        );
    }

    private void sendOtpMail(
            String email,
            String otp,
            String purpose
    ) {
        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);

        if ("SIGNUP".equals(purpose)) {
            message.setSubject("Admin Signup OTP - MedAssist");
            message.setText(
                    "Your Admin Signup OTP is: "
                            + otp
                            + "\n\nThis OTP is valid for 5 minutes."
            );
        } else {
            message.setSubject("Admin Login OTP - MedAssist");
            message.setText(
                    "Your Admin Login OTP is: "
                            + otp
                            + "\n\nThis OTP is valid for 5 minutes."
            );
        }

        mailSender.send(message);
    }

    private void saveOtp(
            String email,
            String otp,
            String purpose
    ) {
        AdminOtp adminOtp =
                new AdminOtp();

        adminOtp.setEmail(email);
        adminOtp.setOtp(otp);
        adminOtp.setPurpose(purpose);
        adminOtp.setVerified(false);
        adminOtp.setCreatedAt(LocalDateTime.now());
        adminOtp.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );

        adminOtpRepository.save(adminOtp);
    }

    /*
     =========================
     ADMIN SIGNUP OTP
     =========================
    */

    @PostMapping("/send-signup-otp")
    public Map<String, String> sendSignupOtp(
            @RequestBody Map<String, String> data
    ) {
        String fullName =
                data.get("fullName");

        String email =
                data.get("email");

        String adminCode =
                data.get("adminCode");

        if (
                fullName == null ||
                        email == null ||
                        adminCode == null
        ) {
            throw new RuntimeException(
                    "Full name, email and admin code are required"
            );
        }

        if (!adminInviteCode.equals(adminCode)) {
            throw new RuntimeException(
                    "Invalid admin invite code"
            );
        }

        if (adminRepository.existsByEmail(email)) {
            throw new RuntimeException(
                    "Admin already exists with this email"
            );
        }

        String otp =
                generateOtp();

        saveOtp(
                email,
                otp,
                "SIGNUP"
        );

        sendOtpMail(
                email,
                otp,
                "SIGNUP"
        );

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Signup OTP sent to admin email"
        );

        return response;
    }

    /*
     =========================
     ADMIN REGISTER
     =========================
    */

    @PostMapping("/register")
    public Map<String, String> registerAdmin(
            @RequestBody Map<String, String> data
    ) {
        String fullName =
                data.get("fullName");

        String email =
                data.get("email");

        String password =
                data.get("password");

        String otp =
                data.get("otp");

        String adminCode =
                data.get("adminCode");

        if (!adminInviteCode.equals(adminCode)) {
            throw new RuntimeException(
                    "Invalid admin invite code"
            );
        }

        AdminOtp savedOtp =
                adminOtpRepository
                        .findTopByEmailAndPurposeOrderByCreatedAtDesc(
                                email,
                                "SIGNUP"
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "OTP not found"
                                )
                        );

        if (savedOtp.getExpiryTime()
                .isBefore(LocalDateTime.now())) {
            throw new RuntimeException(
                    "OTP expired"
            );
        }

        if (!savedOtp.getOtp().equals(otp)) {
            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        if (adminRepository.existsByEmail(email)) {
            throw new RuntimeException(
                    "Admin already exists"
            );
        }

        savedOtp.setVerified(true);
        adminOtpRepository.save(savedOtp);

        Admin admin =
                new Admin();

        admin.setFullName(fullName);
        admin.setEmail(email);
        admin.setPassword(
                passwordEncoder.encode(password)
        );
        admin.setRole("ADMIN");
        admin.setEmailVerified(true);
        admin.setCreatedAt(
                new Date().toString()
        );

        adminRepository.save(admin);

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Admin registered successfully"
        );

        return response;
    }

    /*
     =========================
     ADMIN LOGIN START
     Email + password check
     then OTP send
     =========================
    */

    @PostMapping("/login-start")
    public Map<String, String> loginStart(
            @RequestBody Map<String, String> data
    ) {
        String email =
                data.get("email");

        String password =
                data.get("password");

        Admin admin =
                adminRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        if (!passwordEncoder.matches(
                password,
                admin.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        if (!admin.isEmailVerified()) {
            throw new RuntimeException(
                    "Admin email is not verified"
            );
        }

        String otp =
                generateOtp();

        saveOtp(
                email,
                otp,
                "LOGIN"
        );

        sendOtpMail(
                email,
                otp,
                "LOGIN"
        );

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "Login OTP sent to admin email"
        );

        return response;
    }

    /*
     =========================
     VERIFY LOGIN OTP
     Return JWT token
     =========================
    */

    @PostMapping("/verify-login-otp")
    public Map<String, Object> verifyLoginOtp(
            @RequestBody Map<String, String> data
    ) {
        String email =
                data.get("email");

        String otp =
                data.get("otp");

        AdminOtp savedOtp =
                adminOtpRepository
                        .findTopByEmailAndPurposeOrderByCreatedAtDesc(
                                email,
                                "LOGIN"
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "OTP not found"
                                )
                        );

        if (savedOtp.getExpiryTime()
                .isBefore(LocalDateTime.now())) {
            throw new RuntimeException(
                    "OTP expired"
            );
        }

        if (!savedOtp.getOtp().equals(otp)) {
            throw new RuntimeException(
                    "Invalid OTP"
            );
        }

        savedOtp.setVerified(true);
        adminOtpRepository.save(savedOtp);

        Admin admin =
                adminRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin not found"
                                )
                        );

        String token =
                jwtUtil.generateToken(
                        admin.getId(),
                        admin.getEmail(),
                        admin.getRole()
                );

        Map<String, Object> adminData =
                new HashMap<>();

        adminData.put(
                "id",
                admin.getId()
        );
        adminData.put(
                "fullName",
                admin.getFullName()
        );
        adminData.put(
                "email",
                admin.getEmail()
        );
        adminData.put(
                "role",
                admin.getRole()
        );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Admin login successful"
        );
        response.put(
                "token",
                token
        );
        response.put(
                "admin",
                adminData
        );

        return response;
    }
}