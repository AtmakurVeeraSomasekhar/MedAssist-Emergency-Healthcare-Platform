import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [mode, setMode] =
    useState("LOGIN");

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      otp: "",
      adminCode: ""
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const resetForm = () => {
    setStep(1);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      otp: "",
      adminCode: ""
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  /*
    =========================
    ADMIN LOGIN STEP 1
    Email + password check
    Backend sends OTP to Gmail
    =========================
  */

  const handleLoginStart = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/admin/login-start",
        {
          email: formData.email,
          password: formData.password
        }
      );

      alert(
        "OTP sent to admin email"
      );

      setStep(2);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Admin login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  /*
    =========================
    ADMIN LOGIN STEP 2
    Verify OTP and receive JWT
    =========================
  */

  const handleLoginOtpVerify =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await axios.post(
            "http://localhost:8080/api/admin/verify-login-otp",
            {
              email: formData.email,
              otp: formData.otp
            }
          );

        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        localStorage.setItem(
          "admin",
          JSON.stringify(
            response.data.admin
          )
        );

        alert(
          "Admin login successful"
        );

        navigate("/admin-dashboard");

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
          "Invalid OTP"
        );

      } finally {
        setLoading(false);
      }
    };

  /*
    =========================
    ADMIN SIGNUP STEP 1
    Send OTP to Gmail
    =========================
  */

  const handleSignupOtpSend =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await axios.post(
          "http://localhost:8080/api/admin/send-signup-otp",
          {
            fullName: formData.fullName,
            email: formData.email,
            adminCode: formData.adminCode
          }
        );

        alert(
          "Signup OTP sent to admin email"
        );

        setStep(2);

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
          "OTP sending failed"
        );

      } finally {
        setLoading(false);
      }
    };

  /*
    =========================
    ADMIN SIGNUP STEP 2
    Verify OTP and create admin
    Password must be encrypted in backend
    =========================
  */

  const handleAdminSignup =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await axios.post(
          "http://localhost:8080/api/admin/register",
          {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            otp: formData.otp,
            adminCode: formData.adminCode
          }
        );

        alert(
          "Admin account created successfully. Please login."
        );

        switchMode("LOGIN");

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
          "Admin registration failed"
        );

      } finally {
        setLoading(false);
      }
    };

  return (
    <div style={styles.page}>

      {/* LEFT INTRO SECTION */}

      <div style={styles.leftSection}>

        <div style={styles.brandRow}>
          <div style={styles.logoBox}>
            🛡
          </div>

          <div>
            <h1 style={styles.brandTitle}>
              MedAssist Admin
            </h1>

            <p style={styles.brandSub}>
              Emergency Healthcare Control Center
            </p>
          </div>
        </div>

        <h2 style={styles.heroTitle}>
          Secure Admin Access
          <br />
          For Healthcare Operations
        </h2>

        <p style={styles.heroText}>
          Admins monitor emergency cases, verify doctors, approve ambulance
          drivers, manage healthcare workflows, and track platform activity
          from one secure dashboard.
        </p>

        <div style={styles.roleGrid}>

          <div style={styles.roleCard}>
            👨‍⚕️
            <h3>Doctor Verification</h3>
            <p>Review licenses, certificates, and approve doctors.</p>
          </div>

          <div style={styles.roleCard}>
            🚑
            <h3>Driver Verification</h3>
            <p>Validate ambulance drivers, RC book, and license details.</p>
          </div>

          <div style={styles.roleCard}>
            📊
            <h3>Emergency Analytics</h3>
            <p>Track active emergencies, ambulance status, and reports.</p>
          </div>

          <div style={styles.roleCard}>
            🔐
            <h3>Secure Control</h3>
            <p>JWT login, OTP verification, and protected admin access.</p>
          </div>

        </div>

      </div>

      {/* RIGHT LOGIN CARD */}

      <div style={styles.rightSection}>

        <div style={styles.card}>

          <div style={styles.toggleRow}>
            <button
              type="button"
              style={
                mode === "LOGIN"
                  ? styles.activeTab
                  : styles.tab
              }
              onClick={() =>
                switchMode("LOGIN")
              }
            >
              Admin Login
            </button>

            <button
              type="button"
              style={
                mode === "SIGNUP"
                  ? styles.activeTab
                  : styles.tab
              }
              onClick={() =>
                switchMode("SIGNUP")
              }
            >
              New Admin
            </button>
          </div>

          {
            mode === "LOGIN" && step === 1 && (
              <form
                onSubmit={handleLoginStart}
                style={styles.form}
              >
                <h1 style={styles.title}>
                  🔐 Admin Login
                </h1>

                <p style={styles.subtitle}>
                  Enter your admin credentials. OTP will be sent to your registered Gmail.
                </p>

                <input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Admin Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <button
                  type="submit"
                  style={styles.primaryButton}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Checking..."
                      : "Send Login OTP"
                  }
                </button>
              </form>
            )
          }

          {
            mode === "LOGIN" && step === 2 && (
              <form
                onSubmit={handleLoginOtpVerify}
                style={styles.form}
              >
                <h1 style={styles.title}>
                  📩 Verify Admin OTP
                </h1>

                <p style={styles.subtitle}>
                  Enter the OTP sent to {formData.email}
                </p>

                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6 Digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <button
                  type="submit"
                  style={styles.primaryButton}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Verifying..."
                      : "Verify & Open Dashboard"
                  }
                </button>

                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              </form>
            )
          }

          {
            mode === "SIGNUP" && step === 1 && (
              <form
                onSubmit={handleSignupOtpSend}
                style={styles.form}
              >
                <h1 style={styles.title}>
                  🛡 Create Admin
                </h1>

                <p style={styles.subtitle}>
                  New admin registration requires Gmail OTP and admin invite code.
                </p>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Admin Email"
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
                  name="adminCode"
                  placeholder="Admin Invite Code"
                  value={formData.adminCode}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />

                <button
                  type="submit"
                  style={styles.primaryButton}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Sending OTP..."
                      : "Send Signup OTP"
                  }
                </button>
              </form>
            )
          }

          {
            mode === "SIGNUP" && step === 2 && (
              <form
                onSubmit={handleAdminSignup}
                style={styles.form}
              >
                <h1 style={styles.title}>
                  ✅ Verify & Register
                </h1>

                <p style={styles.subtitle}>
                  Enter OTP to create admin account securely.
                </p>

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
                  style={styles.primaryButton}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Creating..."
                      : "Create Admin Account"
                  }
                </button>

                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
              </form>
            )
          }

          <p style={styles.securityText}>
            🔒 Protected with JWT Authentication, OTP verification, and encrypted password storage.
          </p>

        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
    color: "white"
  },

  leftSection: {
    flex: 1.25,
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "45px"
  },

  logoBox: {
    width: "72px",
    height: "72px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
    boxShadow:
      "0 14px 35px rgba(37,99,235,0.35)"
  },

  brandTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "900"
  },

  brandSub: {
    marginTop: "6px",
    color: "#cbd5e1"
  },

  heroTitle: {
    fontSize: "54px",
    lineHeight: "1.15",
    marginBottom: "22px",
    fontWeight: "900"
  },

  heroText: {
    maxWidth: "720px",
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#cbd5e1",
    marginBottom: "30px"
  },

  roleGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "18px",
    maxWidth: "760px"
  },

  roleCard: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    padding: "22px",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.22)"
  },

  rightSection: {
    flex: 0.85,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "45px"
  },

  card: {
    width: "460px",
    background: "rgba(255,255,255,0.97)",
    color: "#0f172a",
    borderRadius: "30px",
    padding: "34px",
    boxShadow:
      "0 28px 80px rgba(0,0,0,0.45)"
  },

  toggleRow: {
    display: "flex",
    background: "#e2e8f0",
    borderRadius: "18px",
    padding: "6px",
    marginBottom: "25px",
    gap: "6px"
  },

  tab: {
    flex: 1,
    padding: "13px",
    border: "none",
    borderRadius: "14px",
    background: "transparent",
    color: "#475569",
    fontWeight: "bold",
    cursor: "pointer"
  },

  activeTab: {
    flex: 1,
    padding: "13px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow:
      "0 8px 22px rgba(37,99,235,0.28)"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  title: {
    textAlign: "center",
    marginBottom: "4px"
  },

  subtitle: {
    color: "#64748b",
    textAlign: "center",
    lineHeight: "1.5",
    marginBottom: "8px"
  },

  input: {
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none"
  },

  primaryButton: {
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  secondaryButton: {
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background: "#e2e8f0",
    color: "#0f172a",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  securityText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "13px",
    marginTop: "20px",
    lineHeight: "1.5"
  }
};

export default AdminLogin;