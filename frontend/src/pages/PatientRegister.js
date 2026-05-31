import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaUser,
  FaPhone,
  FaTint,
  FaNotesMedical,
  FaLock,
  FaEnvelope
} from "react-icons/fa";

function PatientRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bloodGroup: "",
    age: "",
    emergencyContact: "",
    medicalHistory: ""
  });

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submit
  
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        /* =========================
          SAVE TEMP DATA
        ========================= */

        localStorage.setItem(
          "patientRegisterData",
          JSON.stringify(formData)
        );

        /* =========================
          SEND OTP
        ========================= */

        await axios.post(
          "http://localhost:8080/api/otp/send-otp",
          {
            email: formData.email
          }
        );

        alert(
          "OTP Sent To Email"
        );

        navigate("/verify-otp");

      } catch (error) {

        console.log(error);

        alert(
          "OTP Send Failed"
        );

      }

    };


  return (

    <div style={styles.container}>

      {/* LEFT SIDE IMAGE */}
      <div style={styles.leftSection}>

        <img
          src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1513.jpg"
          alt="medical"
          style={styles.heroImage}
        />

      </div>

      {/* RIGHT SIDE FORM */}
      <div style={styles.rightSection}>

        <form
          onSubmit={handleSubmit}
          style={styles.formCard}
        >

          <h1 style={styles.title}>
            🏥 Patient Registration
          </h1>

          {/* NAME */}
          <div style={styles.inputGroup}>
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* EMAIL */}
          <div style={styles.inputGroup}>
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.inputGroup}>
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* PHONE */}
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

          {/* BLOOD GROUP + AGE */}
          <div style={styles.row}>

            <div style={styles.inputGroupSmall}>
              <FaTint />
              <input
                type="text"
                name="bloodGroup"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroupSmall}>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

          </div>

          {/* EMERGENCY CONTACT */}
          <div style={styles.inputGroup}>
            <FaPhone />
            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact"
              value={formData.emergencyContact}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* MEDICAL HISTORY */}
          <div style={styles.inputGroup}>
            <FaNotesMedical />
            <textarea
              name="medicalHistory"
              placeholder="Medical History"
              value={formData.medicalHistory}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={styles.button}
          >
            Register Patient
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    display: "flex",
    background:
      "linear-gradient(to right,#0f172a,#1e293b)"
  },

  leftSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  heroImage: {
    width: "90%",
    maxWidth: "600px"
  },

  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  formCard: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: "35px",
    borderRadius: "25px",
    color: "white",
    boxShadow:
      "0px 4px 30px rgba(0,0,0,0.3)"
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "32px"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.15)",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "18px"
  },

  inputGroupSmall: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.15)",
    padding: "14px",
    borderRadius: "12px"
  },

  row: {
    display: "flex",
    gap: "15px",
    marginBottom: "18px"
  },

  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "16px"
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    fontSize: "16px",
    resize: "none"
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#ff416c,#ff4b2b)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default PatientRegister;