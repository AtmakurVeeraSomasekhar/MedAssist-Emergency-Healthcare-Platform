import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  getPendingEmergencyRequests,
  acceptEmergencyCase
} from "../services/emergencyRequestApi";

function EmergencyQueueTable() {

  const navigate =
    useNavigate();

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const doctor =
    JSON.parse(
      localStorage.getItem("doctor")
    );

  const loadRequests =
    async () => {

      try {

        const data =
          await getPendingEmergencyRequests();

        setRequests(data);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load emergency queue"
        );

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    loadRequests();

    const interval =
      setInterval(
        loadRequests,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const handleAccept =
    async (requestId) => {

      try {

        const updatedRequest =
          await acceptEmergencyCase(
            requestId,
            doctor?.id || "doctor-demo"
          );

        localStorage.setItem(
          "activeRoomId",
          updatedRequest.roomId
        );

        localStorage.setItem(
          "activePatientId",
          updatedRequest.patientId
        );

        alert(
          "Case accepted successfully"
        );

        navigate("/chat");

      } catch (error) {

        console.log(error);

        alert(
          "Failed to accept case"
        );
      }
    };

  const severityStyle =
    (severity) => {

      if (severity === "HIGH") {
        return styles.high;
      }

      if (severity === "MEDIUM") {
        return styles.medium;
      }

      return styles.low;
    };

  return (

    <div style={styles.wrapper}>

      <div style={styles.header}>

        <div>

          <h2 style={styles.title}>
            🚨 Live Emergency Queue
          </h2>

          <p style={styles.subtitle}>
            Accept urgent patient cases and start communication instantly.
          </p>

        </div>

        <button
          onClick={loadRequests}
          style={styles.refreshBtn}
        >
          Refresh
        </button>

      </div>

      {
        loading ? (

          <h3 style={styles.message}>
            Loading emergency requests...
          </h3>

        ) : requests.length === 0 ? (

          <h3 style={styles.message}>
            No pending emergency cases
          </h3>

        ) : (

          <div style={styles.tableCard}>

            <table style={styles.table}>

              <thead>

                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Symptoms</th>
                  <th style={styles.th}>Severity</th>
                  <th style={styles.th}>Distance</th>
                  <th style={styles.th}>Location</th>
                  <th style={styles.th}>Action</th>
                </tr>

              </thead>

              <tbody>

                {
                  requests.map((request) => (

                    <tr
                      key={request.id}
                      style={styles.tr}
                    >

                      <td style={styles.td}>
                        <b>{request.patientName}</b>
                        <br />
                        <small>
                          {request.phone}
                        </small>
                      </td>

                      <td style={styles.td}>
                        {request.symptoms}
                      </td>

                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.badge,
                            ...severityStyle(
                              request.severity
                            )
                          }}
                        >
                          {request.severity}
                        </span>
                      </td>

                      <td style={styles.td}>
                        {request.distance}
                      </td>

                      <td style={styles.td}>
                        {request.location}
                      </td>

                      <td style={styles.td}>

                        <button
                          style={styles.acceptBtn}
                          onClick={() =>
                            handleAccept(request.id)
                          }
                        >
                          Accept
                        </button>

                      </td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>
        )
      }

    </div>
  );
}

const styles = {

  wrapper: {
    background: "white",
    borderRadius: "24px",
    padding: "25px",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.12)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    color: "#0f172a"
  },

  subtitle: {
    color: "#64748b",
    marginTop: "6px"
  },

  refreshBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontWeight: "bold",
    cursor: "pointer"
  },

  tableCard: {
    overflowX: "auto",
    borderRadius: "18px",
    border: "1px solid #e2e8f0"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    background: "#f8fafc",
    color: "#334155",
    padding: "16px",
    textAlign: "left",
    fontSize: "14px"
  },

  tr: {
    borderTop: "1px solid #e2e8f0"
  },

  td: {
    padding: "16px",
    color: "#0f172a",
    fontSize: "15px"
  },

  badge: {
    color: "white",
    padding: "7px 12px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  high: {
    background: "#dc2626"
  },

  medium: {
    background: "#f59e0b"
  },

  low: {
    background: "#16a34a"
  },

  acceptBtn: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  message: {
    textAlign: "center",
    color: "#64748b",
    padding: "30px"
  }
};

export default EmergencyQueueTable;