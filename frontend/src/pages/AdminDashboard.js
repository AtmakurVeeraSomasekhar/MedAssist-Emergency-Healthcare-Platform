import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaUserInjured,
  FaAmbulance,
  FaHeartbeat,
  FaBell,
  FaCheckCircle,
  FaUserMd,
  FaIdCard,
  FaShieldAlt,
  FaSignOutAlt
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

import {
  getPatients,
  getAmbulanceRequests
} from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] =
    useState([]);

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const admin =
    JSON.parse(
      localStorage.getItem("admin")
    ) || {};

  const adminName =
    admin.fullName ||
    admin.name ||
    "Admin";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("role");
    navigate("/");
  };

  const fetchDashboardData =
    async () => {
      try {
        const patientData =
          await getPatients();

        const ambulanceData =
          await getAmbulanceRequests();

        setPatients(patientData);
        setRequests(ambulanceData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const totalPatients =
    patients.length;

  const activeEmergencies =
    requests.filter(
      (req) =>
        req.status !== "Completed"
    ).length;

  const activeAmbulances =
    requests.filter(
      (req) =>
        req.status === "Arriving"
    ).length;

  const completedCases =
    requests.filter(
      (req) =>
        req.status === "Completed"
    ).length;

  const emergencyData = [
    {
      name: "Pending",
      value:
        requests.filter(
          (r) => r.status === "Pending"
        ).length
    },
    {
      name: "Accepted",
      value:
        requests.filter(
          (r) => r.status === "Accepted"
        ).length
    },
    {
      name: "Arriving",
      value:
        requests.filter(
          (r) => r.status === "Arriving"
        ).length
    },
    {
      name: "Completed",
      value:
        requests.filter(
          (r) => r.status === "Completed"
        ).length
    }
  ];

  const hospitalData = [
    {
      hospital: "Apollo",
      emergencies: 12
    },
    {
      hospital: "Care",
      emergencies: 9
    },
    {
      hospital: "Yashoda",
      emergencies: 7
    },
    {
      hospital: "KIMS",
      emergencies: 5
    }
  ];

  const COLORS = [
    "#f59e0b",
    "#2563eb",
    "#8b5cf6",
    "#10b981"
  ];

  return (
    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            🚑 Professional Admin Dashboard
          </h1>

          <p style={styles.subtitle}>
            Smart Emergency Healthcare Analytics & Verification Control Center
          </p>
        </div>

        <div style={styles.adminProfileBox}>

        <div style={styles.adminInfo}>

          <div style={styles.adminIcon}>
            <FaShieldAlt />
          </div>

          <div>
            <span style={styles.adminLabel}>
              Admin Control
            </span>

            <h3 style={styles.adminName}>
              {adminName}
            </h3>
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

      {
        loading ? (
          <h2 style={styles.loading}>
            Loading Dashboard...
          </h2>
        ) : (
          <>
            {/* TOP CARDS */}

            <div style={styles.cardGrid}>
              <div style={styles.card}>
                <FaUserInjured
                  style={styles.icon}
                />
                <h2>{totalPatients}</h2>
                <p>Total Patients</p>
              </div>

              <div style={styles.card}>
                <FaHeartbeat
                  style={styles.icon}
                />
                <h2>
                  {activeEmergencies}
                </h2>
                <p>Active Emergencies</p>
              </div>

              <div style={styles.card}>
                <FaAmbulance
                  style={styles.icon}
                />
                <h2>
                  {activeAmbulances}
                </h2>
                <p>Ambulances Active</p>
              </div>

              <div style={styles.card}>
                <FaCheckCircle
                  style={styles.icon}
                />
                <h2>
                  {completedCases}
                </h2>
                <p>Completed Cases</p>
              </div>
            </div>

            {/* VERIFICATION CENTER */}

            <div style={styles.verificationSection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  🛡 Verification Center
                </h2>

                <p style={styles.sectionSubtitle}>
                  Admin approval area for doctors and ambulance drivers before they access the platform.
                </p>
              </div>

              <div style={styles.verificationGrid}>
                <div style={styles.verificationCard}>
                  <div style={styles.verificationIconBox}>
                    <FaUserMd />
                  </div>

                  <h2>
                    Doctor Verification Admin
                  </h2>

                  <p>
                    Review MBBS certificate, MD certificate, Aadhaar, medical license number,
                    hospital details, and approve verified doctors.
                  </p>

                  <button
                    style={styles.verifyButton}
                    onClick={() =>
                      navigate("/doctor-verification")
                    }
                  >
                    Open Doctor Verification
                  </button>
                </div>

                <div style={styles.verificationCard}>
                  <div style={styles.verificationIconBox}>
                    <FaIdCard />
                  </div>

                  <h2>
                    Driver Verification Admin
                  </h2>

                  <p>
                    Verify ambulance driver license, RC book, ambulance number,
                    service provider, profile, and approve ambulance drivers.
                  </p>

                  <button
                    style={styles.verifyButton}
                    onClick={() =>
                      navigate("/driver-verification")
                    }
                  >
                    Open Driver Verification
                  </button>
                </div>
              </div>
            </div>

            {/* CHARTS */}

            <div style={styles.chartGrid}>
              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>
                  Emergency Status Analytics
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart
                    data={emergencyData}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#2563eb"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.chartCard}>
                <h2 style={styles.chartTitle}>
                  Emergency Distribution
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <PieChart>
                    <Pie
                      data={emergencyData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {
                        emergencyData.map(
                          (entry, index) => (
                            <Cell
                              key={index}
                              fill={
                                COLORS[index]
                              }
                            />
                          )
                        )
                      }
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* LINE CHART */}

            <div style={styles.chartCard}>
              <h2 style={styles.chartTitle}>
                Hospital Emergency Statistics
              </h2>

              <ResponsiveContainer
                width="100%"
                height={350}
              >
                <LineChart
                  data={hospitalData}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="hospital"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="emergencies"
                    stroke="#10b981"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* LIVE FEED */}

            <div style={styles.feedCard}>
              <h2 style={styles.feedTitle}>
                <FaBell />
                {" "}
                Live Emergency Feed
              </h2>

              {
                requests.map((req) => (
                  <div
                    key={req._id}
                    style={styles.feedItem}
                  >
                    <div>
                      <strong>
                        {req.patientName}
                      </strong>

                      {" — "}

                      {req.emergencyType}
                    </div>

                    <span
                      style={{
                        ...styles.feedStatus,
                        background:
                          req.status === "Completed"
                            ? "#10b981"
                            : "#f59e0b"
                      }}
                    >
                      {req.status}
                    </span>
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  );
}


const styles = {
  container: {
    minHeight: "100vh",
    padding: "35px",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a,#312e81)",
    color: "white"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
    flexWrap: "wrap"
  },

  title: {
    fontSize: "42px",
    fontWeight: "bold"
  },

  subtitle: {
    color: "#cbd5e1",
    marginTop: "10px"
  },

  adminBadge: {
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.18)",
    padding: "16px 22px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: "bold",
    boxShadow:
      "0px 8px 30px rgba(0,0,0,0.25)"
  },

  loading: {
    textAlign: "center"
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "25px",
    marginBottom: "35px"
  },

  card: {
    background:
      "rgba(255,255,255,0.12)",
    padding: "30px",
    borderRadius: "24px",
    textAlign: "center",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0px 8px 30px rgba(0,0,0,0.3)"
  },

  icon: {
    fontSize: "50px",
    marginBottom: "15px",
    color: "#38bdf8"
  },

  verificationSection: {
    background:
      "rgba(255,255,255,0.12)",
    padding: "30px",
    borderRadius: "26px",
    backdropFilter: "blur(14px)",
    marginBottom: "35px",
    boxShadow:
      "0px 8px 30px rgba(0,0,0,0.25)"
  },

  sectionHeader: {
    marginBottom: "25px"
  },

  sectionTitle: {
    fontSize: "30px",
    marginBottom: "8px"
  },

  sectionSubtitle: {
    color: "#cbd5e1"
  },

  verificationGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(320px,1fr))",
    gap: "25px"
  },

  verificationCard: {
    background: "white",
    color: "#0f172a",
    padding: "28px",
    borderRadius: "24px",
    boxShadow:
      "0 15px 40px rgba(0,0,0,0.25)"
  },

  verificationIconBox: {
    width: "62px",
    height: "62px",
    borderRadius: "18px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    marginBottom: "18px"
  },

  verifyButton: {
    marginTop: "20px",
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(450px,1fr))",
    gap: "30px",
    marginBottom: "35px"
  },

  chartCard: {
    background:
      "rgba(255,255,255,0.12)",
    padding: "25px",
    borderRadius: "24px",
    backdropFilter: "blur(14px)",
    marginBottom: "35px"
  },

  chartTitle: {
    marginBottom: "20px",
    fontSize: "24px"
  },

  feedCard: {
    background:
      "rgba(255,255,255,0.12)",
    padding: "25px",
    borderRadius: "24px",
    backdropFilter: "blur(14px)"
  },

  feedTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "25px"
  },

  feedItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background:
      "rgba(255,255,255,0.08)",
    padding: "16px",
    borderRadius: "14px",
    marginBottom: "14px"
  },

  feedStatus: {
    padding: "8px 14px",
    borderRadius: "30px",
    fontWeight: "bold"
  },

  adminProfileBox: {
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.18)",
  padding: "12px 14px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow:
    "0px 8px 30px rgba(0,0,0,0.25)",
  flexWrap: "wrap"
},

adminInfo: {
  display: "flex",
  alignItems: "center",
  gap: "12px"
},

adminIcon: {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  background:
    "linear-gradient(to right,#2563eb,#06b6d4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  color: "white"
},

adminLabel: {
  fontSize: "12px",
  color: "#cbd5e1",
  fontWeight: "600"
},

adminName: {
  margin: 0,
  fontSize: "16px",
  color: "white",
  fontWeight: "800"
},

logoutButton: {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "9px 14px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(to right,#ef4444,#dc2626)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "13px",
  boxShadow:
    "0 6px 15px rgba(220,38,38,0.35)"
}
};

export default AdminDashboard;