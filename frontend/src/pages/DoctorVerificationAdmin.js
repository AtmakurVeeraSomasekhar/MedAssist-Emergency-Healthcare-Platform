import React, { useEffect, useState } from "react";

import {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor
} from "../services/doctorApi";

function DoctorVerificationAdmin() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async () => {
    try {
      const data = await getPendingDoctors();
      setDoctors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      alert("Failed to load pending doctors. Check backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleApprove = async (id) => {
    await approveDoctor(id);
    alert("Doctor approved");
    loadDoctors();
  };

  const handleReject = async (id) => {
    await rejectDoctor(id);
    alert("Doctor rejected");
    loadDoctors();
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Doctor Pending Verification</h1>

      {loading ? (
        <h2 style={styles.message}>Loading doctors...</h2>
      ) : doctors.length === 0 ? (
        <h2 style={styles.message}>No pending doctors found</h2>
      ) : (
        <div style={styles.grid}>
          {doctors.map((doctor) => (
            <div key={doctor.id} style={styles.card}>
              <h2>{doctor.fullName}</h2>

              <p><b>Email:</b> {doctor.email}</p>
              <p><b>Specialization:</b> {doctor.specialization}</p>
              <p><b>Experience:</b> {doctor.experience}</p>
              <p><b>Hospital:</b> {doctor.hospital}</p>
              <p><b>License:</b> {doctor.licenseNumber}</p>
              <p><b>Status:</b> {doctor.verificationStatus}</p>

              {doctor.mbbsCertificateUrl && (
                <a href={doctor.mbbsCertificateUrl} target="_blank" rel="noreferrer">
                  View MBBS Certificate
                </a>
              )}

              {doctor.mdCertificateUrl && (
                <a href={doctor.mdCertificateUrl} target="_blank" rel="noreferrer">
                  View MD Certificate
                </a>
              )}

              <div style={styles.buttons}>
                <button
                  style={styles.approve}
                  onClick={() => handleApprove(doctor.id)}
                >
                  Approve
                </button>

                <button
                  style={styles.reject}
                  onClick={() => handleReject(doctor.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "#0f172a",
    color: "white"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px"
  },
  message: {
    textAlign: "center",
    color: "#cbd5e1"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
    gap: "24px"
  },
  card: {
    background: "white",
    color: "#0f172a",
    padding: "24px",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "15px"
  },
  approve: {
    flex: 1,
    padding: "12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "10px"
  },
  reject: {
    flex: 1,
    padding: "12px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "10px"
  }
};

export default DoctorVerificationAdmin;