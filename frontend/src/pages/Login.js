import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] =
    useState({
      emailOrPhone: "",
      password: ""
    });

  const [showVideo, setShowVideo] =
    useState(false);

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
        await axios.post(
          "http://localhost:5000/api/login",
          {
            emailOrPhone:
              loginData.emailOrPhone,
            password:
              loginData.password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "patient",
        JSON.stringify(
          response.data.patient
        )
      );

      alert(
        response.data.message
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div style={styles.page}>

      {/* LEFT CONTENT */}

      <div style={styles.leftSection}>

        <div style={styles.brandBox}>
          <div style={styles.logoCircle}>
            🚑
          </div>

          <div>
            <h1 style={styles.brand}>
              MedAssist Emergency
            </h1>

            <p style={styles.brandSub}>
              Smart Patient Emergency Healthcare Platform
            </p>
          </div>
        </div>

        <h2 style={styles.heroTitle}>
          Fast Emergency Care,
          <br />
          Doctor Support &
          <br />
          Ambulance Tracking
        </h2>

        <p style={styles.heroText}>
          A trusted healthcare emergency platform that helps patients connect
          with nearby doctors, hospitals, ambulance services, live maps, SOS
          support, and real-time medical assistance from one secure dashboard.
        </p>

        <div style={styles.trustGrid}>

          <div style={styles.trustCard}>
            <h3>24/7</h3>
            <p>Emergency Support</p>
          </div>

          <div style={styles.trustCard}>
            <h3>Live</h3>
            <p>Ambulance Tracking</p>
          </div>

          <div style={styles.trustCard}>
            <h3>Secure</h3>
            <p>Patient Login</p>
          </div>

        </div>

        <div style={styles.featureGrid}>

          <div style={styles.featureCard}>
            🏥 Nearby Hospitals
          </div>

          <div style={styles.featureCard}>
            👨‍⚕️ Doctor Chat
          </div>

          <div style={styles.featureCard}>
            📹 Video Consultation
          </div>

          <div style={styles.featureCard}>
            🚨 Emergency SOS
          </div>

        </div>

        <div
          style={styles.videoCard}
          onClick={() => setShowVideo(true)}
        >
          <div style={styles.playButton}>
            ▶
          </div>

          <div>
            <h3>
              Watch How This App Works
            </h3>

            <p>
              Patient login → emergency dashboard → SOS → ambulance tracking → doctor support
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT LOGIN SECTION */}

      <div style={styles.rightSection}>

        <form
          onSubmit={handleLogin}
          style={styles.form}
        >

          <h1 style={styles.title}>
            🔐 Patient Login
          </h1>

          <p style={styles.subtitle}>
            Access your emergency healthcare dashboard securely.
          </p>

          <input
            type="text"
            name="emailOrPhone"
            placeholder="Enter Email or Phone"
            value={loginData.emailOrPhone}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={loginData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
          >
            Login Securely
          </button>

          <button
            type="button"
            style={styles.forgotButton}
            onClick={() =>
              navigate("/forgot-password")
            }
          >
            Forgot Password?
          </button>

          <div style={styles.divider}>
            <span></span>
            <p>New to MedAssist?</p>
            <span></span>
          </div>

          <button
            type="button"
            style={styles.signupButton}
            onClick={() =>
              navigate("/signup")
            }
          >
            Create New Patient Account
          </button>

          <p style={styles.securityText}>
            🔒 Your health data is protected with secure authentication.
          </p>

        </form>

      </div>

      {/* VIDEO MODAL */}

      {
        showVideo && (
          <div style={styles.modalOverlay}>

            <div style={styles.videoModal}>

              <button
                style={styles.closeButton}
                onClick={() =>
                  setShowVideo(false)
                }
              >
                ✕
              </button>

              <h2 style={styles.videoTitle}>
                How MedAssist Works
              </h2>

              <div style={styles.videoBox}>

                <div style={styles.videoPlaceholder}>
                  🎥
                </div>

                <h3>
                  Emergency Healthcare Flow
                </h3>

                <p>
                  Login securely, find nearby hospitals, send SOS alerts,
                  track ambulance live, chat with doctors, and access
                  emergency healthcare support instantly.
                </p>

              </div>

            </div>

          </div>
        )
      }

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
    flex: 1.35,
    padding: "55px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden"
  },

  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "45px"
  },

  logoCircle: {
    width: "70px",
    height: "70px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg,#ff416c,#ff4b2b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "34px",
    boxShadow:
      "0 15px 35px rgba(255,65,108,0.35)"
  },

  brand: {
    fontSize: "34px",
    margin: 0,
    fontWeight: "800"
  },

  brandSub: {
    color: "#cbd5e1",
    marginTop: "6px"
  },

  heroTitle: {
    fontSize: "56px",
    lineHeight: "1.15",
    marginBottom: "24px",
    fontWeight: "900"
  },

  heroText: {
    maxWidth: "700px",
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "30px"
  },

  trustGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(150px,1fr))",
    gap: "18px",
    maxWidth: "620px",
    marginBottom: "26px"
  },

  trustCard: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "18px",
    padding: "20px",
    backdropFilter: "blur(12px)"
  },

  featureGrid: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "28px"
  },

  featureCard: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "12px 18px",
    borderRadius: "30px",
    fontWeight: "bold",
    color: "#e0f2fe"
  },

  videoCard: {
    maxWidth: "620px",
    background:
      "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(6,182,212,0.18))",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    cursor: "pointer",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.25)"
  },

  playButton: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#1e3a8a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "22px"
  },

  rightSection: {
    flex: 0.85,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  form: {
    width: "430px",
    padding: "38px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.96)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    boxShadow:
      "0px 25px 70px rgba(0,0,0,0.45)"
  },

  title: {
    textAlign: "center",
    color: "#0f172a",
    marginBottom: "2px"
  },

  subtitle: {
    color: "#64748b",
    textAlign: "center",
    marginBottom: "14px",
    lineHeight: "1.5"
  },

  input: {
    padding: "15px",
    fontSize: "16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none"
  },

  button: {
    padding: "15px",
    fontSize: "17px",
    background:
      "linear-gradient(to right,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  forgotButton: {
    background: "transparent",
    border: "none",
    color: "#2563eb",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "-5px"
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#64748b",
    fontSize: "14px"
  },

  signupButton: {
    padding: "14px",
    fontSize: "16px",
    background: "#ecfeff",
    color: "#0369a1",
    border: "1px solid #bae6fd",
    borderRadius: "14px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  securityText: {
    color: "#64748b",
    fontSize: "13px",
    textAlign: "center",
    marginTop: "8px"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(8px)"
  },

  videoModal: {
    width: "520px",
    background:
      "linear-gradient(135deg,#0f172a,#1e3a8a)",
    borderRadius: "28px",
    padding: "35px",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.15)"
  },

  closeButton: {
    position: "absolute",
    top: "18px",
    right: "18px",
    border: "none",
    background: "#dc2626",
    color: "white",
    borderRadius: "10px",
    padding: "8px 12px",
    cursor: "pointer"
  },

  videoTitle: {
    marginBottom: "20px"
  },

  videoBox: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "30px",
    textAlign: "center",
    color: "white"
  },

  videoPlaceholder: {
    fontSize: "70px",
    marginBottom: "15px"
  }

};

export default Login;