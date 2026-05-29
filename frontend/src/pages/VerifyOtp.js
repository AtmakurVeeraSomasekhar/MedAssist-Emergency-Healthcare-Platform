
import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function VerifyOtp() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      otp: ""
    });

  const [timer, setTimer] =
    useState(30);

  const [canResend, setCanResend] =
    useState(false);

  /* =========================
     TIMER
  ========================= */

  useEffect(() => {

    if (timer > 0) {

      const interval =
        setInterval(() => {

          setTimer(
            (prev) => prev - 1
          );

        }, 1000);

      return () =>
        clearInterval(interval);

    } else {

      setCanResend(true);

    }

  }, [timer]);

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  /* =========================
     VERIFY OTP
  ========================= */

  const handleVerify =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await axios.post(
            "http://localhost:5000/api/otp/verify-otp",
            formData
          );

        alert(
          response.data.message
        );

        /* =========================
           GET TEMP USER DATA
        ========================= */

        const patientData =
          JSON.parse(
            localStorage.getItem(
              "patientRegisterData"
            )
          );

        /* =========================
           CREATE ACCOUNT
        ========================= */

        await axios.post(
          "http://localhost:5000/api/patients/register",
          patientData
        );

        /* =========================
           CLEAR STORAGE
        ========================= */

        localStorage.removeItem(
          "patientRegisterData"
        );

        alert(
          "Registration Successful"
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "OTP Verification Failed"
        );

      }

    };

  /* =========================
     RESEND OTP
  ========================= */

  const handleResendOtp =
    async () => {

      try {

        await axios.post(
          "http://localhost:5000/api/otp/send-otp",
          {
            email:
              formData.email
          }
        );

        alert(
          "OTP Resent Successfully"
        );

        setTimer(30);

        setCanResend(false);

      } catch (error) {

        console.log(error);

        alert("Resend Failed");

      }

    };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleVerify}
        style={styles.form}
      >

        <h1 style={styles.title}>
          Verify OTP
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button
          type="submit"
          style={styles.button}
        >
          Verify OTP
        </button>

        {
          canResend ? (

            <button
              type="button"
              onClick={handleResendOtp}
              style={styles.resendBtn}
            >
              Resend OTP
            </button>

          ) : (

            <p style={styles.timer}>
              Resend OTP in {timer}s
            </p>

          )
        }

      </form>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a)"
  },

  form: {
    width: "350px",
    padding: "35px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  title: {
    textAlign: "center",
    color: "white"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px"
  },

  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background:
      "#2563eb",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  timer: {
    color: "white",
    textAlign: "center"
  },

  resendBtn: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }

};

export default VerifyOtp;
