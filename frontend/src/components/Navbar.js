import React from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const patient =
    JSON.parse(
      localStorage.getItem("patient")
    ) || {};

  const userName =
    patient.name ||
    patient.fullName ||
    "Patient";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patient");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>

      {/* LEFT BRAND AREA */}

      <div style={styles.brandSection}>

        <div style={styles.logoBox}>
          🏥
        </div>

        <div>
          <h2 style={styles.appName}>
            MedAssist Emergency
          </h2>

          <p style={styles.tagline}>
            Smart Patient Healthcare & Emergency Support
          </p>
        </div>

      </div>

      {/* CENTER TRUST BADGES */}

      <div style={styles.centerSection}>

        <span style={styles.badge}>
          🔒 Secure
        </span>

        <span style={styles.badge}>
          🚑 24/7 Emergency
        </span>

        <span style={styles.badge}>
          👨‍⚕️ Doctor Support
        </span>

      </div>

      {/* RIGHT USER AREA */}

      <div style={styles.profileSection}>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="user"
          style={styles.profileImage}
        />

        <div style={styles.userDetails}>

          <span style={styles.welcomeText}>
            Welcome
          </span>

          <h3 style={styles.userName}>
            {userName}
          </h3>

        </div>

        <button
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

const styles = {

  navbar: {
    width: "100%",
    background:
      "linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05))",
    padding: "18px 24px",
    borderRadius: "22px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.25)",
    flexWrap: "wrap"
  },

  brandSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  logoBox: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.35)"
  },

  appName: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "0.3px"
  },

  tagline: {
    margin: "4px 0 0",
    color: "#cbd5e1",
    fontSize: "13px"
  },

  centerSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap"
  },

  badge: {
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#e0f2fe",
    padding: "9px 14px",
    borderRadius: "30px",
    fontSize: "13px",
    fontWeight: "700"
  },

  profileSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(15,23,42,0.45)",
    padding: "8px 10px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.10)"
  },

  profileImage: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.25)"
  },

  userDetails: {
    display: "flex",
    flexDirection: "column",
    minWidth: "90px"
  },

  welcomeText: {
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "600"
  },

  userName: {
    margin: 0,
    fontSize: "15px",
    color: "white",
    fontWeight: "800"
  },

  logoutButton: {
    padding: "8px 13px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "12px",
    boxShadow:
      "0 6px 15px rgba(220,38,38,0.35)"
  }

};

export default Navbar;