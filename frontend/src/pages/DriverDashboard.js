import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaAmbulance,
  FaUserInjured,
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaRoute,
  FaComments,
  FaCheckCircle,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaArrowLeft,
  FaShieldAlt,
  FaClock,
  FaMapMarkedAlt
} from "react-icons/fa";

import {
  getAmbulanceRequests,
  updateAmbulanceStatus
} from "../services/api";

function DriverDashboard() {

  const navigate = useNavigate();

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [driverStatus, setDriverStatus] =
    useState("AVAILABLE");

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const driver =
    JSON.parse(
      localStorage.getItem("driver")
    ) || {};

  const driverName =
    driver.fullName ||
    driver.name ||
    "Ambulance Driver";

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {

    const timer =
      setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  const fetchRequests = async () => {

    try {

      setLoading(true);

      const data =
        await getAmbulanceRequests();

      setRequests(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load emergency requests"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleAccept = async (id) => {

    try {

      await updateAmbulanceStatus(
        id,
        "DRIVER_ASSIGNED"
      );

      alert(
        "Emergency accepted successfully"
      );

      fetchRequests();

    } catch (error) {

      console.log(error);

      alert(
        "Unable to accept emergency request"
      );

    }
  };

  const handleLogout = () => {

    localStorage.removeItem("driverToken");
    localStorage.removeItem("driver");
    localStorage.removeItem("role");
    navigate("/");
  };

  const activeRequests =
    requests.filter(
      (req) =>
        req.status !== "Completed"
    ).length;

  const assignedTrips =
    requests.filter(
      (req) =>
        req.status === "DRIVER_ASSIGNED" ||
        req.status === "Driver Assigned"
    ).length;

  const completedTrips =
    requests.filter(
      (req) =>
        req.status === "Completed"
    ).length;

  return (

    <div style={styles.page}>

      {/* SIDEBAR */}

      <aside style={styles.sidebar}>

        <div style={styles.logoBox}>

          <div style={styles.logoIcon}>
            🚑
          </div>

          <div>
            <h2 style={styles.logo}>
              MedRescue
            </h2>

            <p style={styles.logoSub}>
              Driver Emergency Unit
            </p>
          </div>

        </div>

        <div style={styles.profileCard}>

          <FaUserCircle
            size={58}
            color="#38bdf8"
          />

          <h3 style={styles.driverName}>
            {driverName}
          </h3>

          <p style={styles.driverRole}>
            Verified Ambulance Driver
          </p>

          <span style={styles.statusBadge}>
            ● {driverStatus}
          </span>

        </div>

        <div style={styles.menu}>

          <button style={styles.activeMenuBtn}>
            <FaAmbulance />
            Dashboard
          </button>

          <button
            style={styles.menuBtn}
            onClick={() =>
              navigate("/driver-live-map")
            }
          >
            <FaMapMarkedAlt />
            Live Map
          </button>

          <button
            style={styles.menuBtn}
            onClick={() =>
              navigate("/chat")
            }
          >
            <FaComments />
            Patient Chat
          </button>

          <button
            style={styles.menuBtn}
            onClick={() =>
              navigate("/patient-tracking")
            }
          >
            <FaRoute />
            Patient Tracking
          </button>

        </div>

        <div style={styles.quoteBox}>
          “Patient safety is our first priority.”
        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main style={styles.main}>

        {/* NAVBAR */}

        <div style={styles.navbar}>

          <button
            style={styles.backButton}
            onClick={() =>
              navigate("/driver-login")
            }
          >
            <FaArrowLeft />
            Back
          </button>

          <div>
            <h1 style={styles.heading}>
              Driver Dashboard
            </h1>

            <p style={styles.subheading}>
              Real-time ambulance response and patient safety control center
            </p>
          </div>

          <div style={styles.navRight}>

            <div style={styles.timeBox}>
              <FaClock />
              {currentTime.toLocaleTimeString()}
            </div>

            <div style={styles.notification}>
              <FaBell />
            </div>

            <div style={styles.userBox}>

              <FaUserCircle
                size={40}
                color="#38bdf8"
              />

              <div>
                <span style={styles.welcomeText}>
                  Welcome
                </span>

                <h4 style={styles.userName}>
                  {driverName}
                </h4>
              </div>

            </div>

            <button
              style={styles.logoutButton}
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

        {/* HERO SECTION */}

        <section style={styles.hero}>

          <div>

            <span style={styles.heroBadge}>
              🚨 Emergency Response Active
            </span>

            <h2 style={styles.heroTitle}>
              Drive Safe.
              <br />
              Save Lives.
            </h2>

            <p style={styles.heroText}>
              Accept emergency requests, reach patients quickly, communicate clearly,
              and follow safety protocols during every ambulance trip.
            </p>

            <div style={styles.heroActions}>

              <button
                style={styles.primaryButton}
                onClick={() =>
                  navigate("/driver-live-map")
                }
              >
                <FaMapMarkedAlt />
                Open Live Map
              </button>

              <button
                style={styles.secondaryButton}
                onClick={() =>
                  navigate("/chat")
                }
              >
                <FaComments />
                Chat With Patient
              </button>

            </div>

          </div>

          <div style={styles.heroCard}>

            <div style={styles.ambulanceIcon}>
              🚑
            </div>

            <h3>
              Smart Ambulance Unit
            </h3>

            <p>
              Connected with patient location, route tracking, and emergency communication.
            </p>

          </div>

        </section>

        {/* DRIVER STATUS */}

        <section style={styles.statusPanel}>

          <div>
            <h2 style={styles.panelTitle}>
              Driver Availability
            </h2>

            <p style={styles.panelText}>
              Update your current duty status before accepting requests.
            </p>
          </div>

          <select
            value={driverStatus}
            onChange={(e) =>
              setDriverStatus(e.target.value)
            }
            style={styles.statusSelect}
          >
            <option value="AVAILABLE">
              Available
            </option>

            <option value="ON_TRIP">
              On Trip
            </option>

            <option value="BUSY">
              Busy
            </option>

            <option value="OFFLINE">
              Offline
            </option>
          </select>

        </section>

        {/* STATS */}

        <div style={styles.statsGrid}>

          <div style={styles.statCard}>
            <FaAmbulance style={styles.statIcon} />
            <h2>{activeRequests}</h2>
            <p>Active Requests</p>
          </div>

          <div style={styles.statCard}>
            <FaHeartbeat style={styles.statIcon} />
            <h2>{assignedTrips}</h2>
            <p>Assigned Trips</p>
          </div>

          <div style={styles.statCard}>
            <FaRoute style={styles.statIcon} />
            <h2>12 KM</h2>
            <p>Estimated Route</p>
          </div>

          <div style={styles.statCard}>
            <FaCheckCircle style={styles.statIcon} />
            <h2>{completedTrips}</h2>
            <p>Completed Trips</p>
          </div>

        </div>

        {/* SAFETY RULES */}

        <section style={styles.safetySection}>

          <h2 style={styles.sectionTitle}>
            <FaShieldAlt />
            Patient Safety Rules
          </h2>

          <div style={styles.rulesGrid}>

            <div style={styles.ruleCard}>
              <h3>Patient First</h3>
              <p>
                Treat every emergency as high priority and protect patient safety.
              </p>
            </div>

            <div style={styles.ruleCard}>
              <h3>Clear Communication</h3>
              <p>
                Contact the patient or guardian before reaching the pickup location.
              </p>
            </div>

            <div style={styles.ruleCard}>
              <h3>Safe Driving</h3>
              <p>
                Follow traffic rules and avoid rash driving during emergency response.
              </p>
            </div>

          </div>

        </section>

        {/* EMERGENCY REQUESTS */}

        <section style={styles.queueSection}>

          <div style={styles.sectionHeader}>

            <div>
              <h2 style={styles.sectionTitle}>
                🚨 Emergency Queue
              </h2>

              <p style={styles.sectionSub}>
                Accept patient emergency requests and start live assistance.
              </p>
            </div>

            <button
              style={styles.refreshButton}
              onClick={fetchRequests}
            >
              Refresh
            </button>

          </div>

          {
            loading ? (

              <div style={styles.emptyBox}>
                Loading emergency requests...
              </div>

            ) : requests.length === 0 ? (

              <div style={styles.emptyBox}>
                ✅ No emergency requests available right now.
              </div>

            ) : (

              <div style={styles.grid}>

                {
                  requests.map((request) => (

                    <div
                      key={
                        request._id ||
                        request.id
                      }
                      style={styles.card}
                    >

                      <div style={styles.cardTop}>

                        <h2 style={styles.patient}>
                          <FaUserInjured />
                          {request.patientName || "Patient"}
                        </h2>

                        <span style={styles.priority}>
                          HIGH
                        </span>

                      </div>

                      <p style={styles.info}>
                        <FaPhone />
                        {request.phone || "Not Available"}
                      </p>

                      <p style={styles.info}>
                        <FaMapMarkerAlt />
                        {request.location || "Live Location Pending"}
                      </p>

                      <p style={styles.info}>
                        <FaHeartbeat />
                        {request.emergencyType || "Emergency"}
                      </p>

                      <div style={styles.statusBox}>
                        Status:
                        {" "}
                        <b>
                          {request.status || "Pending"}
                        </b>
                      </div>

                      <div style={styles.distanceBox}>
                        🚑 Estimated Distance: 2.4 KM
                      </div>

                      <div style={styles.buttonRow}>

                        <button
                          style={styles.acceptButton}
                          onClick={() =>
                            handleAccept(
                              request._id ||
                              request.id
                            )
                          }
                        >
                          Accept Case
                        </button>

                        <button
                          style={styles.routeButton}
                          onClick={() =>
                            navigate("/driver-live-map")
                          }
                        >
                          <FaRoute />
                        </button>

                        <button
                          style={styles.chatButton}
                          onClick={() =>
                            navigate("/chat")
                          }
                        >
                          <FaComments />
                        </button>

                      </div>

                    </div>

                  ))
                }

              </div>
            )
          }

        </section>

        <div style={styles.footerQuote}>
          “Every second matters in emergency care.”
        </div>

      </main>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "white"
  },

  sidebar: {
    width: "285px",
    background:
      "linear-gradient(180deg,#020617,#0f172a,#1e293b)",
    padding: "26px",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto"
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
    fontSize: "30px"
  },

  logo: {
    margin: 0,
    fontSize: "25px"
  },

  logoSub: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "13px"
  },

  profileCard: {
    background: "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "22px",
    padding: "22px",
    textAlign: "center",
    marginBottom: "26px"
  },

  driverName: {
    margin: "12px 0 4px"
  },

  driverRole: {
    color: "#cbd5e1",
    fontSize: "13px"
  },

  statusBadge: {
    display: "inline-block",
    marginTop: "10px",
    background:
      "rgba(34,197,94,0.18)",
    color: "#86efac",
    padding: "8px 14px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  menuBtn: {
    background: "transparent",
    border:
      "1px solid rgba(255,255,255,0.08)",
    color: "#e2e8f0",
    padding: "14px",
    borderRadius: "14px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },

  activeMenuBtn: {
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    border: "none",
    color: "white",
    padding: "14px",
    borderRadius: "14px",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "bold"
  },

  quoteBox: {
    marginTop: "25px",
    background:
      "rgba(14,165,233,0.14)",
    padding: "18px",
    borderRadius: "18px",
    color: "#e0f2fe",
    lineHeight: "1.6"
  },

  main: {
    flex: 1,
    padding: "30px",
    overflowX: "hidden"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "28px",
    flexWrap: "wrap",
    background: "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "22px"
  },

  backButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  heading: {
    margin: 0,
    fontSize: "34px"
  },

  subheading: {
    margin: "6px 0 0",
    color: "#cbd5e1"
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    flexWrap: "wrap"
  },

  timeBox: {
    background: "rgba(255,255,255,0.09)",
    padding: "11px 15px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#e0f2fe",
    fontWeight: "bold"
  },

  notification: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  userBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(15,23,42,0.55)",
    padding: "9px 12px",
    borderRadius: "18px"
  },

  welcomeText: {
    fontSize: "11px",
    color: "#94a3b8"
  },

  userName: {
    margin: 0,
    fontSize: "15px"
  },

  logoutButton: {
    padding: "11px 15px",
    border: "none",
    borderRadius: "13px",
    background:
      "linear-gradient(to right,#ef4444,#dc2626)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  hero: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1.6fr) minmax(260px,0.8fr)",
    gap: "24px",
    background:
      "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(14,165,233,0.12))",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "32px",
    marginBottom: "26px"
  },

  heroBadge: {
    display: "inline-block",
    background:
      "rgba(34,197,94,0.16)",
    color: "#bbf7d0",
    padding: "9px 14px",
    borderRadius: "30px",
    fontWeight: "bold",
    marginBottom: "16px"
  },

  heroTitle: {
    fontSize: "44px",
    lineHeight: "1.1",
    margin: "0 0 16px"
  },

  heroText: {
    color: "#cbd5e1",
    lineHeight: "1.8"
  },

  heroActions: {
    display: "flex",
    gap: "14px",
    marginTop: "22px",
    flexWrap: "wrap"
  },

  primaryButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  secondaryButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  heroCard: {
    background: "rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "26px",
    textAlign: "center"
  },

  ambulanceIcon: {
    width: "112px",
    height: "112px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    margin: "0 auto 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "54px"
  },

  statusPanel: {
    background: "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    padding: "23px",
    borderRadius: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "26px",
    flexWrap: "wrap"
  },

  panelTitle: {
    margin: 0
  },

  panelText: {
    color: "#cbd5e1",
    marginTop: "6px"
  },

  statusSelect: {
    padding: "14px 18px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    fontWeight: "bold",
    minWidth: "180px"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(210px,1fr))",
    gap: "22px",
    marginBottom: "28px"
  },

  statCard: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "22px",
    padding: "24px",
    border:
      "1px solid rgba(255,255,255,0.09)"
  },

  statIcon: {
    fontSize: "34px",
    color: "#38bdf8",
    marginBottom: "12px"
  },

  safetySection: {
    marginBottom: "28px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "25px"
  },

  rulesGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "18px"
  },

  ruleCard: {
    background: "rgba(255,255,255,0.09)",
    padding: "20px",
    borderRadius: "18px",
    lineHeight: "1.7"
  },

  queueSection: {
    marginTop: "10px"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },

  sectionTitle: {
    margin: 0,
    fontSize: "27px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  sectionSub: {
    color: "#cbd5e1",
    marginTop: "6px"
  },

  refreshButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  emptyBox: {
    background: "rgba(255,255,255,0.08)",
    padding: "35px",
    borderRadius: "22px",
    textAlign: "center",
    color: "#e2e8f0"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(330px,1fr))",
    gap: "22px"
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "24px",
    border:
      "1px solid rgba(255,255,255,0.08)"
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    gap: "12px"
  },

  patient: {
    fontSize: "22px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  priority: {
    background: "#dc2626",
    padding: "8px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  info: {
    marginBottom: "13px",
    color: "#cbd5e1",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  statusBox: {
    background: "rgba(255,255,255,0.08)",
    padding: "13px",
    borderRadius: "14px",
    marginTop: "16px"
  },

  distanceBox: {
    background: "rgba(37,99,235,0.2)",
    padding: "14px",
    borderRadius: "14px",
    marginTop: "14px",
    marginBottom: "18px"
  },

  buttonRow: {
    display: "flex",
    gap: "12px"
  },

  acceptButton: {
    flex: 1,
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  routeButton: {
    width: "56px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#f59e0b,#f97316)",
    color: "white",
    cursor: "pointer"
  },

  chatButton: {
    width: "56px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    cursor: "pointer"
  },

  footerQuote: {
    marginTop: "30px",
    background:
      "linear-gradient(135deg,rgba(34,197,94,0.16),rgba(14,165,233,0.12))",
    borderRadius: "24px",
    padding: "28px",
    textAlign: "center",
    color: "#e0f2fe",
    fontSize: "22px",
    fontWeight: "bold"
  }
};

export default DriverDashboard;