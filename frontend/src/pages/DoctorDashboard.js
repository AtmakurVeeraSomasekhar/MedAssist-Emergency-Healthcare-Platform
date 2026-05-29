import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import EmergencyQueueTable from "../components/EmergencyQueueTable";
import {
  updateDoctorStatus
} from "../services/doctorApi";

import DoctorNotifications
from "../components/DoctorNotifications";

function DoctorDashboard() {

  const navigate = useNavigate();

  const [doctor, setDoctor] =
    useState(null);

  const [onlineStatus, setOnlineStatus] =
    useState("Online");

  useEffect(() => {

    const storedDoctor =
      JSON.parse(
        localStorage.getItem("doctor")
      );

    if (!storedDoctor) {
      navigate("/doctor-login");
      return;
    }

    setDoctor(storedDoctor);

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctor");
    localStorage.removeItem("role");
    navigate("/");
  };

  if (!doctor) {
    return null;
  }

  return (

    <div style={styles.layout}>

      <aside style={styles.sidebar}>

        <h1 style={styles.logo}>
          🩺 MedCare
        </h1>

        {
          [
            "Dashboard",
            "Emergency Queue",
            "Patients",
            "Appointments",
            "Messages",
            "Video Calls",
            "Reports",
            "Profile",
            "Settings"
          ].map((item) => (

            <div
              key={item}
              style={styles.menuItem}
            >
              {item}
            </div>

          ))
        }


        <button
          onClick={handleLogout}
          style={styles.logout}
        >
          Logout
        </button>

      </aside>

      <main style={styles.main}>

        <header style={styles.topbar}>

          <div>
            <h2 style={styles.welcome}>
              Welcome, Dr. {doctor.fullName}
            </h2>

            <p style={styles.subText}>
              {doctor.specialization} • {doctor.hospital}
            </p>
          </div>

          <div style={styles.profileArea}>

            <select
            value={onlineStatus}
            onChange={async (e) => {
                const status = e.target.value;

                setOnlineStatus(status);

                console.log("Doctor ID:", doctor.id);
                console.log("Selected Status:", status);

                const updatedDoctor = await updateDoctorStatus(
                doctor.id,
                status
                );

                console.log("Updated Doctor:", updatedDoctor);

                localStorage.setItem(
                "doctor",
                JSON.stringify(updatedDoctor)
                );
            }}
            style={styles.statusSelect}
            >
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
            <option>Emergency Only</option>
            </select>

            <div style={styles.notification}>
              🔔
            </div>

            <div style={styles.profile}>
              {
                doctor.profilePhotoUrl
                ? (
                  <img
                    src={doctor.profilePhotoUrl}
                    alt="doctor"
                    style={styles.profileImg}
                  />
                )
                : (
                  <span>
                    {doctor.fullName?.charAt(0)}
                  </span>
                )
              }
            </div>

          </div>

        </header>

        <section style={styles.contentGrid}>

        <div>
            <EmergencyQueueTable />
        </div>

        <div>
            <DoctorNotifications />
        </div>

        <div style={styles.panel}>

            <h2>
            Patient Reports
            </h2>

            <div style={styles.reportCard}>
            📄 Blood Report.pdf
            </div>

            <div style={styles.reportCard}>
            🩻 Chest X-Ray.png
            </div>

            <div style={styles.reportCard}>
            🧾 Medical History
            </div>

        </div>

        </section>

        <section style={styles.cards}>

          <div style={styles.card}>
            <h3>Today's Patients</h3>
            <h1>12</h1>
            <p>Scheduled consultations</p>
          </div>

          <div style={styles.card}>
            <h3>Emergency Cases</h3>
            <h1>4</h1>
            <p>Waiting for response</p>
          </div>

          <div style={styles.card}>
            <h3>Consultations</h3>
            <h1>28</h1>
            <p>This month</p>
          </div>

          <div style={styles.card}>
            <h3>Online Status</h3>
            <h1>{onlineStatus}</h1>
            <p>Live availability</p>
          </div>

        </section>

        <section style={styles.contentGrid}>

          <div style={styles.panel}>

            <h2>
              Emergency Queue
            </h2>

            {
              [
                {
                  name: "Rahul",
                  issue: "Chest Pain",
                  priority: "HIGH",
                  distance: "2.1 km"
                },
                {
                  name: "Priya",
                  issue: "Breathing Issue",
                  priority: "HIGH",
                  distance: "3.4 km"
                },
                {
                  name: "Arjun",
                  issue: "Fever",
                  priority: "LOW",
                  distance: "5.2 km"
                }
              ].map((caseItem, index) => (

                <div
                  key={index}
                  style={styles.caseCard}
                >

                  <div>
                    <h3>{caseItem.name}</h3>
                    <p>{caseItem.issue}</p>
                    <small>
                      Distance: {caseItem.distance}
                    </small>
                  </div>

                  <span
                    style={{
                      ...styles.priority,
                      background:
                        caseItem.priority === "HIGH"
                        ? "#dc2626"
                        : "#16a34a"
                    }}
                  >
                    {caseItem.priority}
                  </span>

                  <button
                    style={styles.acceptBtn}
                    onClick={() =>
                      navigate("/chat")
                    }
                  >
                    Accept & Chat
                  </button>

                  <button
                    style={styles.acceptBtn}
                    onClick={() =>
                        navigate("/video-consultation")
                    }
                    >
                    Join Video Consultation
                  </button>

                   <button
                     style={styles.acceptBtn}
                     onClick={() =>
                        navigate("/consultation-room")
                     }
                     >
                     Open Consultation Room
                    </button>

                </div>

              ))
            }

          </div>

          <div style={styles.panel}>

            <h2>
              Patient Reports
            </h2>

            <div style={styles.reportCard}>
              📄 Blood Report.pdf
            </div>

            <div style={styles.reportCard}>
              🩻 Chest X-Ray.png
            </div>

            <div style={styles.reportCard}>
              🧾 Medical History
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

const styles = {

  layout: {
    minHeight: "100vh",
    display: "flex",
    background: "#0f172a"
  },

  sidebar: {
    width: "280px",
    background:
      "linear-gradient(180deg,#020617,#1e293b)",
    color: "white",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  logo: {
    fontSize: "30px",
    marginBottom: "30px"
  },

  menuItem: {
    padding: "15px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.08)",
    cursor: "pointer",
    fontWeight: "600"
  },

  logout: {
    marginTop: "auto",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background: "#dc2626",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  main: {
    flex: 1,
    padding: "30px",
    overflowY: "auto"
  },

  topbar: {
    background: "white",
    borderRadius: "24px",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  welcome: {
    margin: 0,
    color: "#0f172a"
  },

  subText: {
    color: "#64748b"
  },

  profileArea: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  statusSelect: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1"
  },

  notification: {
    fontSize: "24px"
  },

  profile: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "24px"
  },

  profileImg: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  alertBox: {
    background:
      "linear-gradient(to right,#dc2626,#f97316)",
    color: "white",
    padding: "30px",
    borderRadius: "26px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  alertButton: {
    padding: "15px 25px",
    border: "none",
    borderRadius: "14px",
    background: "white",
    color: "#dc2626",
    fontWeight: "bold",
    cursor: "pointer"
  },

  cards: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "22px",
    marginBottom: "30px"
  },

  card: {
    background: "white",
    borderRadius: "24px",
    padding: "25px",
    color: "#0f172a",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.15)"
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px"
  },

  panel: {
    background: "white",
    padding: "25px",
    borderRadius: "24px"
  },

  caseCard: {
    display: "grid",
    gridTemplateColumns: "1fr auto auto",
    alignItems: "center",
    gap: "15px",
    padding: "18px",
    borderRadius: "18px",
    background: "#f8fafc",
    marginBottom: "15px"
  },

  priority: {
    color: "white",
    padding: "8px 14px",
    borderRadius: "30px",
    fontWeight: "bold"
  },

  acceptBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  reportCard: {
    padding: "18px",
    background: "#f1f5f9",
    borderRadius: "16px",
    marginBottom: "12px",
    fontWeight: "600"
  }
};

export default DoctorDashboard;