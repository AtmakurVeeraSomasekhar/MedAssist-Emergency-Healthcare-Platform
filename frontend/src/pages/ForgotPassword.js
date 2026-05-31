
import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const handleSendOtp =
    async (e) => {

      e.preventDefault();

      try {

        /* =========================
           SAVE EMAIL
        ========================= */

        localStorage.setItem(
          "resetEmail",
          email
        );

        /* =========================
           SEND OTP
        ========================= */

        await axios.post(
          "http://localhost:8080/api/otp/send-otp",
          { email }
        );

        alert(
          "OTP Sent To Email"
        );

        navigate(
          "/reset-password"
        );

      } catch (error) {

        console.log(error);

        alert(
          "OTP Send Failed"
        );

      }

    };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleSendOtp}
        style={styles.form}
      >

        <h1 style={styles.title}>
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={styles.input}
          required
        />

        <button
          type="submit"
          style={styles.button}
        >
          Send OTP
        </button>

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
      "linear-gradient(to right,#111827,#1e40af)"
  },

  form: {
    width: "350px",
    padding: "35px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.1)",
    backdropFilter:
      "blur(10px)",
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
  }

};

export default ForgotPassword;
