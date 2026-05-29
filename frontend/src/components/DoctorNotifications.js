import React, {
  useEffect,
  useState
} from "react";

import {
  connectSocket,
  disconnectSocket
} from "../services/socket";

function DoctorNotifications() {

  const [notifications, setNotifications] =
    useState([]);

  const doctor =
    JSON.parse(
      localStorage.getItem("doctor")
    );

  useEffect(() => {

    connectSocket(
      () => {},
      () => {},
      () => {},
      (notification) => {

        if (
          notification.doctorId === doctor?.id ||
          notification.doctorId === "ALL"
        ) {
          setNotifications((prev) => [
            notification,
            ...prev
          ]);
        }
      }
    );

    return () => {
      disconnectSocket();
    };

  }, []);

  const getIcon = (type) => {

    switch (type) {

      case "EMERGENCY":
        return "🚨";

      case "MESSAGE":
        return "💬";

      case "VIDEO":
        return "📹";

      case "AMBULANCE":
        return "🚑";

      default:
        return "🔔";
    }
  };

  return (

    <div style={styles.panel}>

      <h2>
        🔔 Live Notifications
      </h2>

      {
        notifications.length === 0 ? (

          <p style={styles.empty}>
            No new notifications
          </p>

        ) : (

          notifications.map(
            (item, index) => (

            <div
              key={index}
              style={styles.card}
            >
              <h3>
                {getIcon(item.type)} {item.title}
              </h3>

              <p>
                {item.message}
              </p>

              {
                item.roomId && (
                  <small>
                    Room: {item.roomId}
                  </small>
                )
              }
            </div>
          ))
        )
      }

    </div>
  );
}

const styles = {

  panel: {
    background: "white",
    color: "#0f172a",
    borderRadius: "24px",
    padding: "24px",
    boxShadow:
      "0 12px 35px rgba(0,0,0,0.15)"
  },

  empty: {
    color: "#64748b"
  },

  card: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "16px",
    marginBottom: "14px",
    borderLeft:
      "5px solid #2563eb"
  }
};

export default DoctorNotifications;