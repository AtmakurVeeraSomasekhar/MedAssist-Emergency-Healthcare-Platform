
import React, {
  useEffect,
  useState
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import {
  FaAmbulance
} from "react-icons/fa";

/* =========================
   Fix Default Marker Icons
========================= */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

function RealTimeMap() {

  const [ambulancePosition,
    setAmbulancePosition] =
    useState([15.8281, 78.0373]);

  useEffect(() => {

    const interval = setInterval(() => {

      setAmbulancePosition((prev) => [

        prev[0] + 0.0005,
        prev[1] + 0.0005

      ]);

    }, 3000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <FaAmbulance
          style={styles.icon}
        />

        <h1 style={styles.title}>
          Live Ambulance Tracking
        </h1>

        <p style={styles.subtitle}>
          Real-Time Emergency Location
        </p>

      </div>

      <div style={styles.mapWrapper}>

        <MapContainer
          center={ambulancePosition}
          zoom={13}
          style={styles.map}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'

            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={ambulancePosition}>

            <Popup>

              🚑 Ambulance is Moving <br />

              Current Position:
              {" "}
              {ambulancePosition[0].toFixed(4)}
              ,
              {" "}
              {ambulancePosition[1].toFixed(4)}

            </Popup>

          </Marker>

        </MapContainer>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a,#312e81)",
    padding: "30px",
    color: "white"
  },

  header: {
    textAlign: "center",
    marginBottom: "30px"
  },

  icon: {
    fontSize: "70px",
    color: "#ff4b2b",
    marginBottom: "15px"
  },

  title: {
    fontSize: "40px",
    marginBottom: "10px"
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "18px"
  },

  mapWrapper: {
    width: "100%",
    height: "75vh",
    borderRadius: "25px",
    overflow: "hidden",
    boxShadow:
      "0px 10px 40px rgba(0,0,0,0.4)"
  },

  map: {
    width: "100%",
    height: "100%"
  }
};

export default RealTimeMap;
