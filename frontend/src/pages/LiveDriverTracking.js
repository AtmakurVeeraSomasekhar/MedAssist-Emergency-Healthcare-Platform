import React, {
  useEffect,
  useState
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";

import L from "leaflet";

import {
  FaAmbulance,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaClock,
  FaHospital,
  FaRoute,
  FaComments,
  FaShieldAlt
} from "react-icons/fa";

import "leaflet/dist/leaflet.css";

const patientIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [28, 45],
  iconAnchor: [14, 45]
});

const ambulanceIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
  iconSize: [42, 42],
  iconAnchor: [21, 42]
});

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 14);
    }
  }, [center, map]);

  return null;
}

function LiveDriverTracking() {

  const [patientLocation, setPatientLocation] =
    useState(null);

  const [driverLocation, setDriverLocation] =
    useState(null);

  const [driverData, setDriverData] =
    useState({
      driverName: "Ramesh Kumar",
      ambulanceNumber: "AP39XY4587",
      phone: "9876543210",
      status: "Arriving",
      eta: "Calculating",
      hospital: "Nearest Emergency Hospital"
    });

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!patientLocation) {
      return;
    }

    setDriverLocation([
      patientLocation[0] + 0.007,
      patientLocation[1] + 0.007
    ]);
  }, [patientLocation]);

  useEffect(() => {
    if (!patientLocation || !driverLocation) {
      return;
    }

    const interval =
      setInterval(() => {
        setDriverLocation((prev) => {
          const latDiff =
            patientLocation[0] - prev[0];

          const lngDiff =
            patientLocation[1] - prev[1];

          return [
            prev[0] + latDiff * 0.16,
            prev[1] + lngDiff * 0.16
          ];
        });

        const distance =
          calculateDistance(
            patientLocation[0],
            patientLocation[1],
            driverLocation[0],
            driverLocation[1]
          );

        setDriverData((prev) => ({
          ...prev,
          eta:
            `${Math.max(
              2,
              Math.ceil(distance * 3)
            )} mins`
        }));

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [patientLocation, driverLocation]);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientLocation([
          position.coords.latitude,
          position.coords.longitude
        ]);
      },
      () => {
        alert(
          "Please allow location permission"
        );
      }
    );
  };

  const calculateDistance = (
    lat1,
    lon1,
    lat2,
    lon2
  ) => {
    const R = 6371;

    const dLat =
      ((lat2 - lat1) * Math.PI) / 180;

    const dLon =
      ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return Number((R * c).toFixed(2));
  };

  const distance =
    patientLocation && driverLocation
      ? calculateDistance(
          patientLocation[0],
          patientLocation[1],
          driverLocation[0],
          driverLocation[1]
        )
      : "N/A";

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            🚑 Live Ambulance Tracking
          </h1>

          <p style={styles.subtitle}>
            Professional real-time ambulance tracking with ETA, distance, route and patient safety status.
          </p>
        </div>

        <span style={styles.liveBadge}>
          ● LIVE
        </span>

      </div>

      <div style={styles.heroGrid}>

        <div style={styles.driverPanel}>

          <div style={styles.driverAvatar}>
            🚑
          </div>

          <h2>
            {driverData.driverName}
          </h2>

          <p>
            Ambulance Number: {driverData.ambulanceNumber}
          </p>

          <p>
            Status: {driverData.status}
          </p>

          <div style={styles.actionRow}>

            <a
              href={`tel:${driverData.phone}`}
              style={styles.callButton}
            >
              <FaPhoneAlt />
              Call
            </a>

            <button
              style={styles.chatButton}
              onClick={() =>
                window.location.href = "/chat"
              }
            >
              <FaComments />
              Chat
            </button>

          </div>

        </div>

        <div style={styles.statsGrid}>

          <div style={styles.statCard}>
            <FaRoute style={styles.statIcon} />
            <h2>{distance} KM</h2>
            <p>Driver Distance</p>
          </div>

          <div style={styles.statCard}>
            <FaClock style={styles.statIcon} />
            <h2>{driverData.eta}</h2>
            <p>Estimated Arrival</p>
          </div>

          <div style={styles.statCard}>
            <FaHospital style={styles.statIcon} />
            <h2>{driverData.hospital}</h2>
            <p>Destination Support</p>
          </div>

          <div style={styles.statCard}>
            <FaShieldAlt style={styles.statIcon} />
            <h2>Safe</h2>
            <p>Patient Monitoring</p>
          </div>

        </div>

      </div>

      <div style={styles.mapSection}>

        <h2 style={styles.sectionTitle}>
          <FaMapMarkerAlt />
          Real-Time Route Map
        </h2>

        {
          patientLocation &&
          driverLocation ? (

            <MapContainer
              center={patientLocation}
              zoom={14}
              style={styles.map}
            >

              <RecenterMap
                center={patientLocation}
              />

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={patientLocation}
                icon={patientIcon}
              >
                <Popup>
                  📍 Patient Location
                </Popup>
              </Marker>

              <Marker
                position={driverLocation}
                icon={ambulanceIcon}
              >
                <Popup>
                  🚑 Ambulance Driver
                </Popup>
              </Marker>

              <Polyline
                positions={[
                  driverLocation,
                  patientLocation
                ]}
              />

            </MapContainer>

          ) : (

            <div style={styles.emptyMap}>
              Loading live tracking map...
            </div>
          )
        }

      </div>

      <div style={styles.safetyBox}>

        <h2>
          Patient Safety Instructions
        </h2>

        <p>
          Keep your phone reachable, stay at the shared pickup location,
          avoid moving away from the map marker, and contact the driver if your condition changes.
        </p>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
    padding: "32px",
    color: "white"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "28px",
    gap: "20px",
    flexWrap: "wrap"
  },

  title: {
    fontSize: "40px",
    margin: 0
  },

  subtitle: {
    color: "#cbd5e1",
    marginTop: "8px"
  },

  liveBadge: {
    background: "#dc2626",
    color: "white",
    padding: "12px 18px",
    borderRadius: "30px",
    fontWeight: "bold"
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(280px,0.7fr) minmax(420px,1.3fr)",
    gap: "24px",
    marginBottom: "25px"
  },

  driverPanel: {
    background: "rgba(255,255,255,0.1)",
    padding: "28px",
    borderRadius: "26px",
    textAlign: "center"
  },

  driverAvatar: {
    width: "120px",
    height: "120px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "56px"
  },

  actionRow: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "18px"
  },

  callButton: {
    padding: "12px 16px",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "bold"
  },

  chatButton: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "bold"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(210px,1fr))",
    gap: "18px"
  },

  statCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "23px",
    borderRadius: "22px",
    textAlign: "center"
  },

  statIcon: {
    fontSize: "35px",
    color: "#38bdf8",
    marginBottom: "10px"
  },

  mapSection: {
    background: "rgba(255,255,255,0.1)",
    padding: "24px",
    borderRadius: "26px"
  },

  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px"
  },

  map: {
    height: "650px",
    width: "100%",
    borderRadius: "22px"
  },

  emptyMap: {
    height: "650px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "22px"
  },

  safetyBox: {
    marginTop: "25px",
    background:
      "linear-gradient(135deg,rgba(34,197,94,0.16),rgba(14,165,233,0.12))",
    padding: "25px",
    borderRadius: "24px",
    lineHeight: "1.8"
  }
};

export default LiveDriverTracking;