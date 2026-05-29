import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  
  FaShieldAlt,
  FaMapMarkedAlt,
  FaComments,
  FaRoute,
  FaEnvelope,
  FaLock,
  FaKey,
  FaArrowLeft,
  FaUserPlus
} from "react-icons/fa";

import {
  loginDriverStart,
  verifyDriverLoginOtp
} from "../services/driverApi";

function DriverLogin() {

  const navigate = useNavigate();

  const [step, setStep] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      otp: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleLoginStart =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await loginDriverStart({
          email: formData.email,
          password: formData.password
        });

        alert(
          "OTP sent to your registered Gmail"
        );

        setStep(2);

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Login failed. Please check email, password, or admin approval."
        );

      } finally {

        setLoading(false);
      }
    };

  const handleOtpVerify =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await verifyDriverLoginOtp({
            email: formData.email,
            otp: formData.otp
          });

        localStorage.setItem(
          "driverToken",
          response.token
        );

        localStorage.setItem(
          "role",
          "AMBULANCE"
        );

        localStorage.setItem(
          "driver",
          JSON.stringify(
            response.driver
          )
        );

        alert(
          "Driver Login Successful"
        );

        navigate(
          "/driver-dashboard"
        );

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

  return (

    <div style={styles.page}>

      {/* LEFT INTRO */}

      <div style={styles.leftSection}>

        <div style={styles.brandBox}>

          <div style={styles.logoCircle}>
            🚑
          </div>

          <div>
            <h1 style={styles.brand}>
              MedRescue Driver
            </h1>

            <p style={styles.brandSub}>
              Emergency Ambulance Operations Portal
            </p>
          </div>

        </div>

        <h2 style={styles.heroTitle}>
          Drive Safe.
          <br />
          Respond Fast.
          <br />
          Save Lives.
        </h2>

        <p style={styles.heroText}>
          Ambulance drivers use this secure portal to receive emergency requests,
          view patient location, communicate with patients, update trip status,
          and support real-time emergency healthcare operations.
        </p>

        <div style={styles.featureGrid}>

          <div style={styles.featureCard}>
            <FaMapMarkedAlt />
            <h3>Live Patient Location</h3>
            <p>Access pickup points and emergency locations instantly.</p>
          </div>

          <div style={styles.featureCard}>
            <FaRoute />
            <h3>Route Assistance</h3>
            <p>Navigate quickly using emergency route support.</p>
          </div>

          <div style={styles.featureCard}>
            <FaComments />
            <h3>Patient Chat</h3>
            <p>Communicate with patients or guardians during emergencies.</p>
          </div>

          <div style={styles.featureCard}>
            <FaShieldAlt />
            <h3>Secure Access</h3>
            <p>Login with password, Gmail OTP, and JWT authentication.</p>
          </div>

        </div>

        <div style={styles.quoteBox}>
          “Patient safety is our first priority.”
        </div>

      </div>

      {/* RIGHT LOGIN CARD */}

      <div style={styles.rightSection}>

        <div style={styles.card}>

          {
            step === 1 && (

              <form
                onSubmit={handleLoginStart}
                style={styles.form}
              >

                <h1 style={styles.title}>
                  🚑 Driver Login
                </h1>

                <p style={styles.subtitle}>
                  Enter your approved driver credentials. OTP will be sent to your Gmail.
                </p>

                <div style={styles.inputGroup}>
                  <FaEnvelope style={styles.inputIcon} />

                  <input
                    type="email"
                    name="email"
                    placeholder="Driver Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <div style={styles.inputGroup}>
                  <FaLock style={styles.inputIcon} />

                  <input
                    type="password"
                    name="password"
                    placeholder="Driver Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={styles.button}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Sending OTP..."
                      : "Send OTP & Continue"
                  }
                </button>

                <button
                  type="button"
                  style={styles.registerButton}
                  onClick={() =>
                    navigate("/driver-register")
                  }
                >
                  <FaUserPlus />
                  New Driver? Register Here
                </button>

              </form>
            )
          }

          {
            step === 2 && (

              <form
                onSubmit={handleOtpVerify}
                style={styles.form}
              >

                <h1 style={styles.title}>
                  📩 Verify OTP
                </h1>

                <p style={styles.subtitle}>
                  Enter the OTP sent to:
                  <br />
                  <b>{formData.email}</b>
                </p>

                <div style={styles.inputGroup}>
                  <FaKey style={styles.inputIcon} />

                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6 Digit OTP"
                    value={formData.otp}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={styles.button}
                  disabled={loading}
                >
                  {
                    loading
                      ? "Verifying..."
                      : "Verify OTP & Login"
                  }
                </button>

                <button
                  type="button"
                  style={styles.backButton}
                  onClick={() =>
                    setStep(1)
                  }
                >
                  <FaArrowLeft />
                  Back to Login
                </button>

              </form>
            )
          }

          <p style={styles.securityText}>
            🔐 Protected with Gmail OTP, JWT Authentication, and encrypted password login.
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

  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "45px"
  },

  logoCircle: {
    width: "72px",
    height: "72px",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    boxShadow:
      "0 15px 35px rgba(239,68,68,0.35)"
  },

  brand: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "900"
  },

  brandSub: {
    marginTop: "6px",
    color: "#cbd5e1"
  },

  heroTitle: {
    fontSize: "58px",
    lineHeight: "1.1",
    marginBottom: "24px",
    fontWeight: "900"
  },

  heroText: {
    maxWidth: "720px",
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "30px"
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    maxWidth: "780px"
  },

  featureCard: {
    background:
      "rgba(255,255,255,0.1)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "22px",
    padding: "22px",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.25)"
  },

  quoteBox: {
    marginTop: "28px",
    maxWidth: "520px",
    background:
      "rgba(34,197,94,0.16)",
    color: "#bbf7d0",
    padding: "18px 22px",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "17px"
  },

  rightSection: {
    flex: 0.85,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "45px"
  },

  card: {
    width: "450px",
    background:
      "rgba(255,255,255,0.97)",
    color: "#0f172a",
    borderRadius: "30px",
    padding: "38px",
    boxShadow:
      "0 28px 80px rgba(0,0,0,0.45)"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  title: {
    textAlign: "center",
    marginBottom: "4px",
    color: "#0f172a"
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    lineHeight: "1.5",
    marginBottom: "10px"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "15px",
    padding: "0 14px",
    background: "#f8fafc"
  },

  inputIcon: {
    color: "#2563eb"
  },

  input: {
    width: "100%",
    padding: "16px 0",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px"
  },

  button: {
    padding: "16px",
    border: "none",
    borderRadius: "15px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer"
  },

  registerButton: {
    padding: "15px",
    border: "1px solid #bae6fd",
    borderRadius: "15px",
    background: "#ecfeff",
    color: "#0369a1",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },

  backButton: {
    padding: "15px",
    border: "none",
    borderRadius: "15px",
    background: "#e2e8f0",
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },

  securityText: {
    marginTop: "22px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "1.5"
  }
};

export default DriverLogin;