
import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function ResetPassword() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      otp: "",
      newPassword: ""

    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleReset =
    async (e) => {

      e.preventDefault();

      try {

        const email =
          localStorage.getItem(
            "resetEmail"
          );

        /* =========================
           VERIFY OTP
        ========================= */

        await axios.post(
          "http://localhost:5000/api/otp/verify-otp",
          {
            email,
            otp:
              formData.otp
          }
        );

        /* =========================
           RESET PASSWORD
        ========================= */

        await axios.post(
          "http://localhost:5000/api/otp/reset-password",
          {
            email,
            newPassword:
              formData.newPassword
          }
        );

        alert(
          "Password Reset Successful"
        );

        localStorage.removeItem(
          "resetEmail"
        );

        navigate("/login");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Reset Failed"
        );

      }

    };

  return (

    <div style={styles.container}>

      <form
        onSubmit={handleReset}
        style={styles.form}
      >

        <h1 style={styles.title}>
          Reset Password
        </h1>

        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={
            formData.newPassword
          }
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button
          type="submit"
          style={styles.button}
        >
          Reset Password
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

export default ResetPassword;