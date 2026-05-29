import React, {
  useEffect,
  useState
} from "react";

import {
  getPendingDrivers,
  approveDriver,
  rejectDriver
} from "../services/driverApi";

function DriverVerifyPage() {
  const [drivers, setDrivers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadDrivers = async () => {
    try {
      setLoading(true);

      const data =
        await getPendingDrivers();

      setDrivers(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.log(error);
      alert("Failed to load pending drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveDriver(id);

      alert("Driver approved successfully");

      loadDrivers();
    } catch (error) {
      console.log(error);
      alert("Driver approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectDriver(id);

      alert("Driver rejected");

      loadDrivers();
    } catch (error) {
      console.log(error);
      alert("Driver rejection failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            🚑 Driver Verification Admin
          </h1>

          <p style={styles.subtitle}>
            Review ambulance driver documents, RC book, license, and approve verified drivers.
          </p>
        </div>

        <div style={styles.countBox}>
          <h2>{drivers.length}</h2>
          <p>Pending Drivers</p>
        </div>
      </div>

      {loading ? (
        <div style={styles.emptyBox}>
          Loading pending drivers...
        </div>
      ) : drivers.length === 0 ? (
        <div style={styles.emptyBox}>
          ✅ No pending driver approvals
        </div>
      ) : (
        <div style={styles.grid}>
          {drivers.map((driver) => (
            <div
              key={driver.id}
              style={styles.card}
            >
              <div style={styles.profileRow}>
                <img
                  src={
                    driver.profilePhotoUrl ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="driver"
                  style={styles.image}
                />

                <div>
                  <h2 style={styles.name}>
                    {driver.fullName || "Driver Name"}
                  </h2>

                  <span style={styles.badge}>
                    Pending Verification
                  </span>
                </div>
              </div>

              <div style={styles.details}>
                <p><b>Email:</b> {driver.email || "N/A"}</p>
                <p><b>Phone:</b> {driver.phone || "N/A"}</p>
                <p><b>Ambulance:</b> {driver.ambulanceNumber || "N/A"}</p>
                <p><b>RC Number:</b> {driver.vehicleRcNumber || "N/A"}</p>
                <p><b>License:</b> {driver.drivingLicenseNumber || "N/A"}</p>
                <p><b>Experience:</b> {driver.experience || "N/A"}</p>
                <p><b>Provider:</b> {driver.serviceProvider || "N/A"}</p>
              </div>

              <div style={styles.links}>
                {driver.drivingLicenseUrl ? (
                  <a
                    href={driver.drivingLicenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    View Driving License
                  </a>
                ) : (
                  <span style={styles.missing}>
                    Driving License Missing
                  </span>
                )}

                {driver.rcBookUrl ? (
                  <a
                    href={driver.rcBookUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.link}
                  >
                    View RC Book
                  </a>
                ) : (
                  <span style={styles.missing}>
                    RC Book Missing
                  </span>
                )}
              </div>

              <div style={styles.buttons}>
                <button
                  style={styles.approve}
                  onClick={() =>
                    handleApprove(driver.id)
                  }
                >
                  Approve Driver
                </button>

                <button
                  style={styles.reject}
                  onClick={() =>
                    handleReject(driver.id)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#1e3a8a,#2563eb)",
    padding: "40px",
    color: "white"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "35px",
    flexWrap: "wrap"
  },

  title: {
    fontSize: "42px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "17px",
    maxWidth: "760px"
  },

  countBox: {
    background: "rgba(255,255,255,0.14)",
    backdropFilter: "blur(14px)",
    borderRadius: "22px",
    padding: "20px 30px",
    minWidth: "180px",
    textAlign: "center",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.25)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(360px,1fr))",
    gap: "26px"
  },

  card: {
    background: "white",
    color: "#0f172a",
    padding: "26px",
    borderRadius: "26px",
    boxShadow:
      "0 18px 45px rgba(0,0,0,0.28)"
  },

  profileRow: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "20px"
  },

  image: {
    width: "92px",
    height: "92px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #e0f2fe"
  },

  name: {
    marginBottom: "8px"
  },

  badge: {
    display: "inline-block",
    background: "#fef3c7",
    color: "#92400e",
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  details: {
    background: "#f8fafc",
    padding: "18px",
    borderRadius: "18px",
    lineHeight: "1.7"
  },

  links: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "18px"
  },

  link: {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none"
  },

  missing: {
    color: "#dc2626",
    fontWeight: "bold"
  },

  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "24px"
  },

  approve: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#16a34a,#22c55e)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  reject: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#dc2626,#ef4444)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  emptyBox: {
    background: "rgba(255,255,255,0.14)",
    backdropFilter: "blur(14px)",
    padding: "45px",
    borderRadius: "24px",
    textAlign: "center",
    fontSize: "24px",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.25)"
  }
};

export default DriverVerifyPage;