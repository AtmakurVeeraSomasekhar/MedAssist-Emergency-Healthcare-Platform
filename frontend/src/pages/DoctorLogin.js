import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginDoctor } from "../services/doctorApi";

function DoctorLogin() {

  const navigate = useNavigate();

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: ""
    });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await loginDoctor(loginData);
      
      localStorage.setItem(
        "doctorToken",
        response.token
       );
       
      localStorage.setItem(
        "doctor",
        JSON.stringify(response.doctor)
      );

      localStorage.setItem(
        "role",
        "DOCTOR"
      );

      navigate("/doctor-dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Your account is under verification or login failed"
      );
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.left}>

          <h1 style={styles.brand}>
            MedCare Doctor
          </h1>

          <p style={styles.text}>
            Login to manage emergency cases, patients,
            chats, video consultations and reports.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          style={styles.form}
        >

          <h2 style={styles.title}>
            Doctor Login
          </h2>

          <p style={styles.subtitle}>
            Only admin-approved doctors can login.
          </p>

          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            value={loginData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Login Doctor
          </button>

          <button
            type="button"
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/doctor-register")
            }
          >
            New Doctor? Register
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#1e3a8a,#2563eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  card: {
    width: "100%",
    maxWidth: "1100px",
    minHeight: "620px",
    display: "flex",
    borderRadius: "30px",
    overflow: "hidden",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow:
      "0 25px 80px rgba(0,0,0,0.45)"
  },

  left: {
    flex: 1,
    padding: "60px",
    color: "white",
    background:
      "linear-gradient(160deg,rgba(15,23,42,0.95),rgba(37,99,235,0.6))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  brand: {
    fontSize: "46px",
    fontWeight: "800",
    marginBottom: "20px"
  },

  text: {
    fontSize: "18px",
    lineHeight: "1.8",
    opacity: 0.9
  },

  form: {
    flex: 1,
    background: "white",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  title: {
    fontSize: "36px",
    color: "#0f172a",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "30px"
  },

  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    marginBottom: "18px",
    fontSize: "16px",
    outline: "none"
  },

  button: {
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "14px"
  },

  secondaryButton: {
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: "#e2e8f0",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default DoctorLogin;