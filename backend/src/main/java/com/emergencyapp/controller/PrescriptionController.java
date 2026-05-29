package com.emergencyapp.controller;

import com.emergencyapp.model.Prescription;
import com.emergencyapp.repository.PrescriptionRepository;

import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

    private final PrescriptionRepository repository;

    public PrescriptionController(
            PrescriptionRepository repository
    ) {
        this.repository = repository;
    }

    @PostMapping("/create")
    public Prescription createPrescription(
            @RequestBody Prescription prescription
    ) {
        prescription.setCreatedAt(new Date());

        return repository.save(prescription);
    }

    @GetMapping("/patient/{patientId}")
    public List<Prescription> getByPatient(
            @PathVariable String patientId
    ) {
        return repository.findByPatientId(patientId);
    }

    @GetMapping("/room/{roomId}")
    public List<Prescription> getByRoom(
            @PathVariable String roomId
    ) {
        return repository.findByRoomId(roomId);
    }
}