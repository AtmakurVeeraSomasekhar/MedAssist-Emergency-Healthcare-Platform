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

import L from "leaflet";

import {
  FaHospital,
  FaMapMarkerAlt,
  FaAmbulance
} from "react-icons/fa";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"
});

function NearbyEmergencyMap() {

  const [userLocation, setUserLocation] =
    useState([15.8281, 78.0373]);

  const [ambulanceLocation, setAmbulanceLocation] =
    useState([15.8321, 78.0403]);

  const [route, setRoute] =
    useState([]);

  const hospitals = [
    {
      id: 1,
      name: "Apollo Hospital",
      position: [15.8301, 78.0353]
    },
    {
      id: 2,
      name: "Care Hospital",
      position: [15.8261, 78.0413]
    },
    {
      id: 3,
      name: "Yashoda Hospital",
      position: [15.8241, 78.0303]
    }
  ];

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

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const currentLocation = [
          position.coords.latitude,
          position.coords.longitude
        ];

        setUserLocation(currentLocation);

        getRoute(
          ambulanceLocation,
          currentLocation
        );
      },

      (error) => {

        console.log(error);

        getRoute(
          ambulanceLocation,
          userLocation
        );
      }
    );

  }, [ambulanceLocation, userLocation]);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setAmbulanceLocation((prev) => {

          const newPosition = [
            prev[0] + 0.0002,
            prev[1] + 0.0002
          ];

          getRoute(
            newPosition,
            userLocation
          );

          return newPosition;
        });

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [userLocation]);

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <FaAmbulance style={styles.icon} />

        <h1 style={styles.title}>
          Nearby Emergency Services
        </h1>

        <p style={styles.subtitle}>
          Live Location + Hospitals + Ambulance Route
        </p>

      </div>

      <div style={styles.mapWrapper}>

        <MapContainer
          center={userLocation}
          zoom={14}
          style={styles.map}
        >

          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={userLocation}>
            <Popup>
              📍 Your Current Location
            </Popup>
          </Marker>

          <Marker position={ambulanceLocation}>
            <Popup>
              🚑 Ambulance is Arriving
            </Popup>
          </Marker>

          {
            hospitals.map((hospital) => (

              <Marker
                key={hospital.id}
                position={hospital.position}
              >
                <Popup>
                  🏥 {hospital.name}
                </Popup>
              </Marker>
            ))
          }

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

      <div style={styles.legend}>

        <div style={styles.legendItem}>
          <FaMapMarkerAlt />
          <span>Your Location</span>
        </div>

        <div style={styles.legendItem}>
          <FaAmbulance />
          <span>Ambulance</span>
        </div>

        <div style={styles.legendItem}>
          <FaHospital />
          <span>Hospitals</span>
        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a,#312e81)",
    padding: "25px",
    color: "white"
  },

  header: {
    textAlign: "center",
    marginBottom: "25px"
  },

  icon: {
    fontSize: "70px",
    color: "#ff4b2b",
    marginBottom: "15px"
  },

  title: {
    fontSize: "42px",
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
  },

  legend: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "25px",
    flexWrap: "wrap"
  },

  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background:
      "rgba(255,255,255,0.12)",
    padding: "12px 20px",
    borderRadius: "15px",
    fontSize: "16px"
  }
};

export default NearbyEmergencyMap;