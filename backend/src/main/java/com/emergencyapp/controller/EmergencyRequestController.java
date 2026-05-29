package com.emergencyapp.controller;

import com.emergencyapp.model.EmergencyRequest;
import com.emergencyapp.repository.EmergencyRequestRepository;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class EmergencyRequestController {

    private final EmergencyRequestRepository emergencyRequestRepository;

    public EmergencyRequestController(
            EmergencyRequestRepository emergencyRequestRepository
    ) {
        this.emergencyRequestRepository =
                emergencyRequestRepository;
    }

    /*
     =========================
     CREATE EMERGENCY REQUEST
     POST /api/emergency-requests/create
     =========================
    */

    @PostMapping("/create")
    public EmergencyRequest createEmergencyRequest(
            @RequestBody EmergencyRequest request
    ) {
        if (
                request.getStatus() == null ||
                        request.getStatus().isBlank()
        ) {
            request.setStatus("Pending");
        }

        String now =
                new java.util.Date().toString();

        request.setCreatedAt(now);
        request.setUpdatedAt(now);

        return emergencyRequestRepository.save(request);
    }

    /*
     =========================
     GET ALL REQUESTS
     GET /api/emergency-requests
     =========================
    */

    @GetMapping
    public List<EmergencyRequest> getAllEmergencyRequests() {
        return emergencyRequestRepository.findAll();
    }

    /*
     =========================
     GET PENDING REQUESTS
     GET /api/emergency-requests/pending
     =========================
    */

    @GetMapping("/pending")
    public List<EmergencyRequest> getPendingEmergencyRequests() {
        return emergencyRequestRepository
                .findByStatus("Pending");
    }

    /*
     =========================
     DOCTOR ACCEPT CASE
     PUT /api/emergency-requests/accept/{requestId}/{doctorId}
     =========================
    */

    @PutMapping("/accept/{requestId}/{doctorId}")
    public EmergencyRequest acceptEmergencyCase(
            @PathVariable String requestId,
            @PathVariable String doctorId
    ) {
        EmergencyRequest request =
                emergencyRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Emergency request not found"
                                )
                        );

        request.setDoctorId(doctorId);
        request.setStatus("Accepted");

        if (
                request.getRoomId() == null ||
                        request.getRoomId().isBlank()
        ) {
            request.setRoomId(
                    "ROOM-" + requestId.substring(
                            0,
                            Math.min(6, requestId.length())
                    )
            );
        }

        request.setUpdatedAt(
                new java.util.Date().toString()
        );

        return emergencyRequestRepository.save(request);
    }

    /*
     =========================
     GET DOCTOR ACTIVE CASES
     GET /api/emergency-requests/active/{doctorId}
     =========================
    */

    @GetMapping("/active/{doctorId}")
    public List<EmergencyRequest> getDoctorActiveCases(
            @PathVariable String doctorId
    ) {
        return emergencyRequestRepository
                .findByDoctorIdAndStatus(
                        doctorId,
                        "Accepted"
                );
    }

    /*
     =========================
     COMPLETE CASE
     PUT /api/emergency-requests/complete/{requestId}
     =========================
    */

    @PutMapping("/complete/{requestId}")
    public EmergencyRequest completeEmergencyCase(
            @PathVariable String requestId
    ) {
        EmergencyRequest request =
                emergencyRequestRepository
                        .findById(requestId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Emergency request not found"
                                )
                        );

        request.setStatus("Completed");

        request.setUpdatedAt(
                new java.util.Date().toString()
        );

        return emergencyRequestRepository.save(request);
    }
}