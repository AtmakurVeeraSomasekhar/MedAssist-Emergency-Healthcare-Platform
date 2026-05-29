import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      bloodGroup: "",
      age: "",
      emergencyContact: "",
      medicalHistory: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.phone
      ) {
        alert("Please fill all required fields");
        return;
      }

      /*
        Save patient data temporarily.
        After OTP verification, this data will be used
        to create the patient account.
      */

      localStorage.setItem(
        "patientRegisterData",
        JSON.stringify(formData)
      );

      /*
        Send OTP to email
      */

      await axios.post(
        "http://localhost:5000/api/otp/send-otp",
        {
          email: formData.email
        }
      );

      alert("OTP sent to your email");

      navigate("/verify-otp");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "OTP sending failed"
      );

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.leftSection}>

        <h1 style={styles.brand}>
          🏥 MedAssist Emergency
        </h1>

        <h2 style={styles.heroTitle}>
          Create Your Patient Account
        </h2>

        <p style={styles.heroText}>
          Register securely to access emergency SOS, nearby hospitals,
          ambulance tracking, doctor consultation, medical reports,
          and real-time healthcare support.
        </p>

        <div style={styles.features}>

          <div style={styles.featureCard}>
            🚑 Ambulance Tracking
          </div>

          <div style={styles.featureCard}>
            👨‍⚕️ Doctor Support
          </div>

          <div style={styles.featureCard}>
            🔐 Email OTP Verification
          </div>

          <div style={styles.featureCard}>
            📍 Live Location Emergency
          </div>

        </div>

      </div>

      <div style={styles.rightSection}>

        <form
          onSubmit={handleSignup}
          style={styles.card}
        >

          <h1 style={styles.title}>
            Patient Signup
          </h1>

          <p style={styles.subtitle}>
            Verify your email with OTP before creating your account.
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <div style={styles.row}>

            <input
              type="text"
              name="bloodGroup"
              placeholder="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
              style={styles.smallInput}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              style={styles.smallInput}
            />

          </div>

          <input
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formData.emergencyContact}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="medicalHistory"
            placeholder="Medical History"
            value={formData.medicalHistory}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Send OTP & Continue
          </button>

          <p style={styles.loginText}>
            Already have an account?
            {" "}
            <span
              style={styles.loginLink}
              onClick={() =>
                navigate("/login")
              }
            >
              Login here
            </span>
          </p>

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
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)"
  },

  leftSection: {
    flex: 1,
    color: "white",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  brand: {
    fontSize: "34px",
    marginBottom: "25px"
  },

  heroTitle: {
    fontSize: "52px",
    lineHeight: "1.15",
    marginBottom: "20px"
  },

  heroText: {
    maxWidth: "650px",
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "30px"
  },

  features: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap"
  },

  featureCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "14px 20px",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.12)",
    fontWeight: "bold"
  },

  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "470px",
    background: "white",
    padding: "38px",
    borderRadius: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    boxShadow:
      "0px 25px 70px rgba(0,0,0,0.45)"
  },

  title: {
    textAlign: "center",
    color: "#0f172a"
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginBottom: "8px"
  },

  input: {
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none"
  },

  row: {
    display: "flex",
    gap: "12px"
  },

  smallInput: {
    flex: 1,
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none"
  },

  textarea: {
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    minHeight: "85px",
    resize: "none"
  },

  button: {
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  loginText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: "8px"
  },

  loginLink: {
    color: "#2563eb",
    fontWeight: "bold",
    cursor: "pointer"
  }

};

export default Signup;