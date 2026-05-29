package com.emergencyapp.controller;

import com.emergencyapp.model.Driver;
import com.emergencyapp.model.DriverOtp;
import com.emergencyapp.repository.DriverOtpRepository;
import com.emergencyapp.repository.DriverRepository;
import com.emergencyapp.security.JwtUtil;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "http://localhost:3000")
public class DriverController {

    private final DriverRepository driverRepository;
    private final DriverOtpRepository driverOtpRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final JavaMailSender mailSender;

    public DriverController(
            DriverRepository driverRepository,
            DriverOtpRepository driverOtpRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            JavaMailSender mailSender
    ) {
        this.driverRepository = driverRepository;
        this.driverOtpRepository = driverOtpRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.mailSender = mailSender;
    }

    private String generateOtp() {
        return String.valueOf(
                100000 + new Random().nextInt(900000)
        );
    }

    private void saveOtp(
            String email,
            String otp,
            String purpose
    ) {
        DriverOtp driverOtp =
                new DriverOtp();

        driverOtp.setEmail(email);
        driverOtp.setOtp(otp);
        driverOtp.setPurpose(purpose);
        driverOtp.setVerified(false);
        driverOtp.setCreatedAt(LocalDateTime.now());
        driverOtp.setExpiryTime(
                LocalDateTime.now().plusMinutes(5)
        );

        driverOtpRepository.save(driverOtp);
    }

    private void sendOtpMail(
            String email,
            String otp
    ) {
        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(email);
        message.setSubject(
                "Driver Login OTP - MedRescue"
        );

        message.setText(
                "Your Driver Login OTP is: "
                        + otp
                        + "\n\nThis OTP is valid for 5 minutes."
                        + "\n\nPatient safety is our first priority."
        );

        mailSender.send(message);
    }

    /* =========================
       DRIVER REGISTER
    ========================= */

    @PostMapping("/register")
    public Driver registerDriver(
            @RequestBody Driver driver
    ) {
        if (driverRepository.existsByEmail(driver.getEmail())) {
            throw new RuntimeException(
                    "Driver already exists with this email"
            );
        }

        driver.setPassword(
                passwordEncoder.encode(
                        driver.getPassword()
                )
        );

        driver.setRole("AMBULANCE");
        driver.setVerificationStatus("PENDING");
        driver.setOnlineStatus("Offline");
        driver.setLastSeen(new Date().toString());

        return driverRepository.save(driver);
    }

    /* =========================
       DRIVER LOGIN START
       Email + Password Check
       Then Send Gmail OTP
    ========================= */

    @PostMapping("/login-start")
    public Map<String, String> loginStart(
            @RequestBody Map<String, String> loginData
    ) {
        String email =
                loginData.get("email");

        String password =
                loginData.get("password");

        Driver driver =
                driverRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        if (!passwordEncoder.matches(
                password,
                driver.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        if (!"APPROVED".equals(driver.getVerificationStatus())) {
            throw new RuntimeException(
                    "Your driver account is under admin verification."
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
                otp
        );

        Map<String, String> response =
                new HashMap<>();

        response.put(
                "message",
                "OTP sent to registered Gmail"
        );

        return response;
    }

    /* =========================
       VERIFY LOGIN OTP
       Return JWT Token
    ========================= */

    @PostMapping("/verify-login-otp")
    public Map<String, Object> verifyLoginOtp(
            @RequestBody Map<String, String> data
    ) {
        String email =
                data.get("email");

        String otp =
                data.get("otp");

        DriverOtp savedOtp =
                driverOtpRepository
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
        driverOtpRepository.save(savedOtp);

        Driver driver =
                driverRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        String token =
                jwtUtil.generateToken(
                        driver.getId(),
                        driver.getEmail(),
                        driver.getRole()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Driver login successful"
        );

        response.put(
                "token",
                token
        );

        response.put(
                "driver",
                driver
        );

        return response;
    }

    /* =========================
       OLD DIRECT LOGIN
       Optional Backup
    ========================= */

    @PostMapping("/login")
    public Map<String, Object> loginDriver(
            @RequestBody Map<String, String> loginData
    ) {
        String email =
                loginData.get("email");

        String password =
                loginData.get("password");

        Driver driver =
                driverRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );

        if (!passwordEncoder.matches(
                password,
                driver.getPassword()
        )) {
            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        if (!"APPROVED".equals(driver.getVerificationStatus())) {
            throw new RuntimeException(
                    "Your driver account is under admin verification."
            );
        }

        String token =
                jwtUtil.generateToken(
                        driver.getId(),
                        driver.getEmail(),
                        driver.getRole()
                );

        Map<String, Object> response =
                new HashMap<>();

        response.put(
                "message",
                "Driver login successful"
        );

        response.put(
                "driver",
                driver
        );

        response.put(
                "token",
                token
        );

        return response;
    }

    /* =========================
       ADMIN VERIFICATION
    ========================= */

    @GetMapping("/pending")
    public List<Driver> getPendingDrivers() {
        return driverRepository
                .findByVerificationStatus("PENDING");
    }

    @GetMapping("/available")
    public List<Driver> getAvailableDrivers() {
        return driverRepository
                .findByOnlineStatus("Available");
    }

    @PutMapping("/approve/{id}")
    public Driver approveDriver(
            @PathVariable String id
    ) {
        Driver driver =
                driverRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        driver.setVerificationStatus("APPROVED");

        return driverRepository.save(driver);
    }

    @PutMapping("/reject/{id}")
    public Driver rejectDriver(
            @PathVariable String id
    ) {
        Driver driver =
                driverRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        driver.setVerificationStatus("REJECTED");

        return driverRepository.save(driver);
    }

    /* =========================
       DRIVER STATUS
    ========================= */

    @PutMapping("/status/{driverId}")
    public Driver updateDriverStatus(
            @PathVariable String driverId,
            @RequestBody Map<String, String> data
    ) {
        Driver driver =
                driverRepository.findById(driverId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        driver.setOnlineStatus(
                data.get("onlineStatus")
        );

        driver.setLastSeen(
                new Date().toString()
        );

        return driverRepository.save(driver);
    }

    /* =========================
       DRIVER LIVE LOCATION
    ========================= */

    @PutMapping("/location/{driverId}")
    public Driver updateDriverLocation(
            @PathVariable String driverId,
            @RequestBody Map<String, String> data
    ) {
        Driver driver =
                driverRepository.findById(driverId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Driver not found"
                                )
                        );

        driver.setCurrentLatitude(
                data.get("latitude")
        );

        driver.setCurrentLongitude(
                data.get("longitude")
        );

        driver.setLastSeen(
                new Date().toString()
        );

        return driverRepository.save(driver);
    }
}