import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function DriverLiveMap() {

  const patientLocation =
    useMemo(() => [17.3850, 78.4867], []);

  const [driverPosition, setDriverPosition] =
    useState([17.3600, 78.4700]);

  const [route, setRoute] =
    useState([]);

  const getRoute =
    useCallback(async (start, end) => {

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

    }, []);

  useEffect(() => {

    getRoute(
      driverPosition,
      patientLocation
    );

    const interval =
      setInterval(() => {

        setDriverPosition((prev) => {

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

    return () =>
      clearInterval(interval);

  }, [
    driverPosition,
    patientLocation,
    getRoute
  ]);

  return (

    <div style={styles.container}>

      <h1 style={styles.title}>
        🚑 Ambulance Live Route Tracking
      </h1>

      <div style={styles.infoPanel}>

        <div style={styles.infoCard}>
          <h3>Patient Location</h3>
          <p>Hyderabad Emergency Point</p>
        </div>

        <div style={styles.infoCard}>
          <h3>Ambulance Status</h3>
          <p>Arriving</p>
        </div>

        <div style={styles.infoCard}>
          <h3>Route Optimization</h3>
          <p>Free OSRM + OpenStreetMap</p>
        </div>

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
            🧍 Patient Emergency Location
          </Popup>
        </Marker>

        <Marker position={driverPosition}>
          <Popup>
            🚑 Ambulance Current Location
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

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a)",
    padding: "24px"
  },

  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "24px",
    fontSize: "38px"
  },

  infoPanel: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "18px",
    marginBottom: "22px"
  },

  infoCard: {
    background: "white",
    color: "#0f172a",
    padding: "18px",
    borderRadius: "18px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)"
  },

  map: {
    height: "78vh",
    width: "100%",
    borderRadius: "22px"
  }
};

export default DriverLiveMap;