import React, {
  useEffect,
  useState
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

function PatientTracking() {

  const patientLocation = [17.3850, 78.4867];

  const [ambulancePosition, setAmbulancePosition] =
    useState([17.3600, 78.4700]);

  const [status, setStatus] =
    useState("Ambulance Arriving");

  const [route, setRoute] =
    useState([]);

  const getRoute = async (start, end) => {

    try {

      const url =
        `https://router.project-osrm.org/route/v1/driving/` +
        `${start[1]},${start[0]};${end[1]},${end[0]}` +
        `?overview=full&geometries=geojson`;

      const response =
        await fetch(url);

      const data =
        await response.json();

      if (
        data.routes &&
        data.routes.length > 0
      ) {

        const coordinates =
          data.routes[0].geometry.coordinates.map(
            (coord) => [
              coord[1],
              coord[0]
            ]
          );

        setRoute(coordinates);
      }

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    getRoute(
      ambulancePosition,
      patientLocation
    );

    const interval =
      setInterval(() => {

        setAmbulancePosition((prev) => {

          const newPosition = [
            prev[0] + 0.001,
            prev[1] + 0.001
          ];

          getRoute(
            newPosition,
            patientLocation
          );

          return newPosition;
        });

      }, 4000);

    const timer1 =
      setTimeout(() => {

        setStatus("Driver Reached Nearby");

        toast.success(
          "🚑 Driver Reached Nearby"
        );

      }, 8000);

    const timer2 =
      setTimeout(() => {

        setStatus("Patient Picked Up");

        toast.success(
          "✅ Patient Picked Up"
        );

      }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };

  }, []);

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        🚑 Track Ambulance Live
      </h1>

      <div style={styles.statusBox}>
        Current Status:
        {" "}
        <span style={styles.statusText}>
          {status}
        </span>
      </div>

      <MapContainer
        center={patientLocation}
        zoom={13}
        style={styles.map}
      >

        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={patientLocation}>
          <Popup>
            🧍 Your Emergency Location
          </Popup>
        </Marker>

        <Marker position={ambulancePosition}>
          <Popup>
            🚑 Ambulance Live Location
          </Popup>
        </Marker>

        {
          route.length > 0 && (
            <Polyline
              positions={route}
              weight={6}
            />
          )
        }

      </MapContainer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#111827,#1e40af)",
    padding: "20px"
  },

  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "20px",
    fontSize: "40px",
    fontWeight: "bold"
  },

  statusBox: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center"
  },

  statusText: {
    color: "#2563eb"
  },

  map: {
    height: "80vh",
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden"
  }
};

export default PatientTracking;