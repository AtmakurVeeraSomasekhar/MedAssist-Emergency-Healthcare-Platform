package com.emergencyapp.controller;

import com.emergencyapp.model.EmergencyRequest;
import com.emergencyapp.repository.EmergencyRequestRepository;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ambulance")
@CrossOrigin(origins = "http://localhost:3000")
public class AmbulanceController {

    private final EmergencyRequestRepository emergencyRequestRepository;

    public AmbulanceController(
            EmergencyRequestRepository emergencyRequestRepository
    ) {
        this.emergencyRequestRepository =
                emergencyRequestRepository;
    }

    /*
     =========================
     CREATE AMBULANCE REQUEST
     POST /api/ambulance
     =========================
    */

    @PostMapping
    public EmergencyRequest createAmbulanceRequest(
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
     GET ALL AMBULANCE REQUESTS
     GET /api/ambulance
     =========================
    */

    @GetMapping
    public List<EmergencyRequest> getAllAmbulanceRequests() {
        return emergencyRequestRepository.findAll();
    }

    /*
     =========================
     GET REQUESTS BY STATUS
     GET /api/ambulance/status/{status}
     =========================
    */

    @GetMapping("/status/{status}")
    public List<EmergencyRequest> getRequestsByStatus(
            @PathVariable String status
    ) {
        return emergencyRequestRepository
                .findByStatus(status);
    }

    /*
     =========================
     GET PATIENT REQUESTS
     GET /api/ambulance/patient/{patientId}
     =========================
    */

    @GetMapping("/patient/{patientId}")
    public List<EmergencyRequest> getRequestsByPatientId(
            @PathVariable String patientId
    ) {
        return emergencyRequestRepository
                .findByPatientId(patientId);
    }

    /*
     =========================
     OLD NODE STATUS UPDATE COMPATIBILITY
     PUT /api/ambulance/{id}
     =========================
    */

    @PutMapping("/{id}")
    public EmergencyRequest updateAmbulanceStatusOld(
            @PathVariable String id,
            @RequestBody Map<String, String> data
    ) {
        return updateStatus(
                id,
                data
        );
    }

    /*
     =========================
     FRONTEND STATUS UPDATE
     PUT /api/ambulance/status/{id}
     =========================
    */

    @PutMapping("/status/{id}")
    public EmergencyRequest updateAmbulanceStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> data
    ) {
        return updateStatus(
                id,
                data
        );
    }

    private EmergencyRequest updateStatus(
            String id,
            Map<String, String> data
    ) {
        String status =
                data.get("status");

        if (
                status == null ||
                        status.isBlank()
        ) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Status is required"
            );
        }

        EmergencyRequest request =
                emergencyRequestRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Ambulance request not found"
                                )
                        );

        request.setStatus(status);

        request.setUpdatedAt(
                new java.util.Date().toString()
        );

        return emergencyRequestRepository.save(request);
    }

    /*
     =========================
     ASSIGN DRIVER TO REQUEST
     PUT /api/ambulance/assign-driver/{id}
     =========================
    */

    @PutMapping("/assign-driver/{id}")
    public EmergencyRequest assignDriver(
            @PathVariable String id,
            @RequestBody Map<String, String> data
    ) {
        EmergencyRequest request =
                emergencyRequestRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Ambulance request not found"
                                )
                        );

        request.setDriverId(
                data.get("driverId")
        );

        request.setDriverName(
                data.get("driverName")
        );

        request.setDriverPhone(
                data.get("driverPhone")
        );

        request.setAmbulanceNumber(
                data.get("ambulanceNumber")
        );

        request.setDriverLatitude(
                data.get("driverLatitude")
        );

        request.setDriverLongitude(
                data.get("driverLongitude")
        );

        request.setStatus(
                data.getOrDefault(
                        "status",
                        "Accepted"
                )
        );

        request.setUpdatedAt(
                new java.util.Date().toString()
        );

        return emergencyRequestRepository.save(request);
    }

    /*
     =========================
     UPDATE DRIVER LIVE LOCATION
     PUT /api/ambulance/driver-location/{id}
     =========================
    */

    @PutMapping("/driver-location/{id}")
    public EmergencyRequest updateDriverLocation(
            @PathVariable String id,
            @RequestBody Map<String, String> data
    ) {
        EmergencyRequest request =
                emergencyRequestRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Ambulance request not found"
                                )
                        );

        request.setDriverLatitude(
                data.get("driverLatitude")
        );

        request.setDriverLongitude(
                data.get("driverLongitude")
        );

        request.setUpdatedAt(
                new java.util.Date().toString()
        );

        return emergencyRequestRepository.save(request);
    }
}