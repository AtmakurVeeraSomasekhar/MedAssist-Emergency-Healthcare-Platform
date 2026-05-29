import React, { useState } from "react";

import {
  FaAmbulance,
  FaHospital,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaUserInjured
} from "react-icons/fa";

import {
  requestAmbulance
} from "../services/api";

function AmbulanceBooking() {

  const [formData, setFormData] =
    useState({

      patientName: "",
      phone: "",
      location: "",
      emergencyType: "",
      hospital: ""

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      console.log(formData);

      const response =
        await requestAmbulance(formData);

      console.log(response);

      alert(
        "🚑 Ambulance Requested Successfully"
      );

      setFormData({
        patientName: "",
        phone: "",
        location: "",
        emergencyType: "",
        hospital: ""
      });

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Request Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.overlay}>

        <div style={styles.card}>

          <div style={styles.header}>

            <FaAmbulance
              style={styles.icon}
            />

            <h1 style={styles.title}>
              Emergency Ambulance Booking
            </h1>

            <p style={styles.subtitle}>
              24/7 Emergency Healthcare Support
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
          >

            {/* Patient Name */}

            <div style={styles.inputGroup}>

              <FaUserInjured />

              <input
                type="text"
                name="patientName"
                placeholder="Patient Name"
                value={
                  formData.patientName
                }
                onChange={handleChange}
                style={styles.input}
                required
              />

            </div>

            {/* Phone */}

            <div style={styles.inputGroup}>

              <FaPhone />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                required
              />

            </div>

            {/* Location */}

            <div style={styles.inputGroup}>

              <FaMapMarkerAlt />

              <input
                type="text"
                name="location"
                placeholder="Current Location"
                value={formData.location}
                onChange={handleChange}
                style={styles.input}
                required
              />

            </div>

            {/* Emergency Type */}

                <div style={styles.inputGroup}>

                <FaHeartbeat />

                <input
                  type="text"
                  name="emergencyType"
                placeholder="Enter Emergency Type"
                value={
                 formData.emergencyType
            }
                onChange={handleChange}
                style={styles.input}
                required
                />

            </div>

            {/* Hospital */}

            <div style={styles.inputGroup}>

              <FaHospital />

              <input
                type="text"
                name="hospital"
                placeholder="Enter Hospital"
                value={
                  formData.hospital
                }
                onChange={handleChange}
                style={styles.input}
                required
              />

            </div>

            {/* Submit Button */}

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >

              {
                loading
                ? "Requesting Ambulance..."
                : "🚑 Request Ambulance"
              }

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a,#312e81)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px"
  },

  overlay: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },

  card: {
    width: "100%",
    maxWidth: "550px",
    background:
      "rgba(255,255,255,0.12)",
    backdropFilter: "blur(15px)",
    borderRadius: "30px",
    padding: "40px",
    color: "white",
    boxShadow:
      "0px 8px 40px rgba(0,0,0,0.4)"
  },

  header: {
    textAlign: "center",
    marginBottom: "35px"
  },

  icon: {
    fontSize: "70px",
    color: "#ff4d4d",
    marginBottom: "15px"
  },

  title: {
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#d1d5db",
    fontSize: "16px"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background:
      "rgba(255,255,255,0.15)",
    padding: "16px",
    borderRadius: "14px",
    marginBottom: "20px"
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "16px"
  },

  select: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "16px"
  },

  button: {
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "16px",
    background:
      "linear-gradient(to right,#ff416c,#ff4b2b)",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px"
  }
};

export default AmbulanceBooking;