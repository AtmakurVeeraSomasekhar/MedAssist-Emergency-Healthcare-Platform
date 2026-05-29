import React from "react";

import {
  FaHome,
  FaHospital,
  FaUserMd,
  FaAmbulance,
  FaMapMarkedAlt,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaRobot,
  FaUserCircle,
  FaShieldAlt,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar({
  activeSection,
  setActiveSection,
  onLogout
}) {

  const menuItems = [

    {
      id: "overview",
      label: "Dashboard",
      icon: <FaHome />
    },

    {
      id: "hospitals",
      label: "Nearby Hospitals",
      icon: <FaHospital />
    },

    {
      id: "doctors",
      label: "Doctors",
      icon: <FaUserMd />
    },

    {
      id: "ambulance",
      label: "Book Ambulance",
      icon: <FaAmbulance />
    },

    {
      id: "tracking",
      label: "Live Tracking",
      icon: <FaMapMarkedAlt />
    },

    {
      id: "records",
      label: "Medical Records",
      icon: <FaFileMedical />
    },

    {
      id: "prescription",
      label: "Prescription",
      icon: <FaPrescriptionBottleAlt />
    },

    {
      id: "ai",
      label: "AI Assistant",
      icon: <FaRobot />
    },

    {
      id: "profile",
      label: "Patient Profile",
      icon: <FaUserCircle />
    }
  ];

  return (

    <div style={styles.sidebar}>

      <div style={styles.logoBox}>

        <div style={styles.logoIcon}>
          🚑
        </div>

        <div>
          <h2 style={styles.logo}>
            MedCare
          </h2>

          <p style={styles.logoSub}>
            Emergency Health Portal
          </p>
        </div>

      </div>

      <div style={styles.trustBox}>

        <FaShieldAlt style={styles.trustIcon} />

        <div>
          <h4 style={styles.trustTitle}>
            Secure Patient Care
          </h4>

          <p style={styles.trustText}>
            Emergency support, doctors, ambulance and hospital tracking in one place.
          </p>
        </div>

      </div>

      <div style={styles.menu}>

        {
          menuItems.map((item) => (

            <button
              key={item.id}
              style={
                activeSection === item.id
                  ? styles.activeMenuItem
                  : styles.menuItem
              }
              onClick={() =>
                setActiveSection(item.id)
              }
            >
              <span style={styles.menuIcon}>
                {item.icon}
              </span>

              {item.label}
            </button>

          ))
        }

      </div>

      <button
        style={styles.logoutButton}
        onClick={onLogout}
      >
        <FaSignOutAlt />
        Logout
      </button>

      <div style={styles.footerNote}>
        “Every second matters in emergency care.”
      </div>

    </div>
  );
}

const styles = {

  sidebar: {
    width: "280px",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg,#020617,#0f172a,#1e293b)",
    color: "white",
    padding: "26px 20px",
    position: "fixed",
    left: 0,
    top: 0,
    overflowY: "auto",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "8px 0 35px rgba(0,0,0,0.35)",
    zIndex: 10
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "26px"
  },

  logoIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    boxShadow:
      "0 12px 30px rgba(239,68,68,0.35)"
  },

  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "900"
  },

  logoSub: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "12px"
  },

  trustBox: {
    background:
      "rgba(14,165,233,0.12)",
    border:
      "1px solid rgba(14,165,233,0.18)",
    borderRadius: "20px",
    padding: "18px",
    marginBottom: "25px",
    display: "flex",
    gap: "12px"
  },

  trustIcon: {
    color: "#38bdf8",
    fontSize: "26px",
    marginTop: "3px"
  },

  trustTitle: {
    margin: 0,
    fontSize: "15px"
  },

  trustText: {
    color: "#cbd5e1",
    fontSize: "12px",
    lineHeight: "1.5",
    marginTop: "6px"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  menuItem: {
    padding: "14px 16px",
    borderRadius: "14px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    textAlign: "left"
  },

  activeMenuItem: {
    padding: "14px 16px",
    borderRadius: "14px",
    border: "none",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    textAlign: "left",
    boxShadow:
      "0 8px 24px rgba(37,99,235,0.35)"
  },

  menuIcon: {
    fontSize: "18px"
  },

  logoutButton: {
    width: "100%",
    marginTop: "24px",
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px"
  },

  footerNote: {
    marginTop: "22px",
    background:
      "rgba(34,197,94,0.12)",
    color: "#bbf7d0",
    padding: "16px",
    borderRadius: "16px",
    fontSize: "13px",
    lineHeight: "1.6",
    textAlign: "center",
    fontWeight: "700"
  }
};

export default Sidebar;