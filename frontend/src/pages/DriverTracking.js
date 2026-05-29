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
  FaHospital,
  FaMapMarkerAlt,
  FaRoute,
  FaPhoneAlt,
  FaClock,
  FaLocationArrow
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

const hospitalIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36]
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

function DriverTracking() {

  const [patientLocation, setPatientLocation] =
    useState(null);

  const [driverLocation, setDriverLocation] =
    useState(null);

  const [hospitals, setHospitals] =
    useState([]);

  const [driverData] =
    useState({
      name: "Emergency Ambulance Driver",
      phone: "9876543210",
      ambulanceNumber: "AP39 EM 1088",
      status: "Moving Towards Patient"
    });

  useEffect(() => {
    getPatientLocation();
  }, []);

  useEffect(() => {
    if (!patientLocation) {
      return;
    }

    setDriverLocation([
      patientLocation[0] + 0.008,
      patientLocation[1] + 0.008
    ]);

    fetchNearbyHospitals(
      patientLocation[0],
      patientLocation[1]
    );
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
            prev[0] + latDiff * 0.15,
            prev[1] + lngDiff * 0.15
          ];
        });
      }, 3000);

    return () =>
      clearInterval(interval);

  }, [patientLocation, driverLocation]);

  const getPatientLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPatientLocation([
          position.coords.latitude,
          position.coords.longitude
        ]);
      },
      () => {
        alert(
          "Please allow location permission for live tracking"
        );
      }
    );
  };

  const fetchNearbyHospitals =
    async (lat, lon) => {
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:5000,${lat},${lon});
        );
        out;
      `;

      const url =
        "https://overpass-api.de/api/interpreter?data="
        + encodeURIComponent(query);

      try {
        const response =
          await fetch(url);

        const data =
          await response.json();

        const list =
          (data.elements || [])
            .map((hospital) => ({
              id: hospital.id,
              name:
                hospital.tags?.name ||
                "Nearby Hospital",
              lat: hospital.lat,
              lon: hospital.lon,
              distance:
                calculateDistance(
                  lat,
                  lon,
                  hospital.lat,
                  hospital.lon
                )
            }))
            .sort(
              (a, b) =>
                a.distance - b.distance
            )
            .slice(0, 5);

        setHospitals(list);
      } catch (error) {
        console.log(error);
      }
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

  const eta =
    distance !== "N/A"
      ? `${Math.max(
          2,
          Math.ceil(distance * 3)
        )} mins`
      : "Calculating";

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            🚑 Live Driver Tracking
          </h1>

          <p style={styles.subtitle}>
            Real-time ambulance movement, patient pickup, hospital distance and route navigation.
          </p>
        </div>

        <button
          style={styles.locationButton}
          onClick={getPatientLocation}
        >
          <FaLocationArrow />
          Refresh Location
        </button>

      </div>

      <div style={styles.statsGrid}>

        <div style={styles.statCard}>
          <FaAmbulance style={styles.statIcon} />
          <h2>{driverData.status}</h2>
          <p>Driver Status</p>
        </div>

        <div style={styles.statCard}>
          <FaRoute style={styles.statIcon} />
          <h2>{distance} KM</h2>
          <p>Driver Distance</p>
        </div>

        <div style={styles.statCard}>
          <FaClock style={styles.statIcon} />
          <h2>{eta}</h2>
          <p>Estimated Arrival</p>
        </div>

        <div style={styles.statCard}>
          <FaHospital style={styles.statIcon} />
          <h2>{hospitals.length}</h2>
          <p>Nearby Hospitals</p>
        </div>

      </div>

      <div style={styles.contentGrid}>

        <div style={styles.mapCard}>

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

                {
                  hospitals.map((hospital) => (

                    <Marker
                      key={hospital.id}
                      position={[
                        hospital.lat,
                        hospital.lon
                      ]}
                      icon={hospitalIcon}
                    >
                      <Popup>
                        <h3>
                          {hospital.name}
                        </h3>
                        <p>
                          {hospital.distance} KM away
                        </p>
                      </Popup>
                    </Marker>

                  ))
                }

              </MapContainer>

            ) : (

              <div style={styles.emptyMap}>
                Loading live map...
              </div>
            )
          }

        </div>

        <div style={styles.sidePanel}>

          <div style={styles.driverCard}>
            <div style={styles.driverIcon}>
              🚑
            </div>

            <h2>{driverData.name}</h2>

            <p>
              Ambulance: {driverData.ambulanceNumber}
            </p>

            <p>
              Phone: {driverData.phone}
            </p>

            <a
              href={`tel:${driverData.phone}`}
              style={styles.callButton}
            >
              <FaPhoneAlt />
              Call Driver
            </a>
          </div>

          <div style={styles.hospitalList}>

            <h2>
              <FaHospital />
              Nearest Hospitals
            </h2>

            {
              hospitals.length === 0 ? (

                <p>
                  Nearby hospitals loading...
                </p>

              ) : (

                hospitals.map((hospital) => (

                  <div
                    key={hospital.id}
                    style={styles.hospitalItem}
                  >

                    <h3>
                      {hospital.name}
                    </h3>

                    <p>
                      {hospital.distance} KM from patient
                    </p>

                    <a
                      href={
                        `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lon}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      style={styles.routeButton}
                    >
                      Open Route
                    </a>

                  </div>
                ))
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
    padding: "30px",
    color: "white"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
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

  locationButton: {
    padding: "13px 18px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px"
  },

  statCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "22px",
    borderRadius: "22px",
    textAlign: "center"
  },

  statIcon: {
    fontSize: "35px",
    color: "#38bdf8",
    marginBottom: "10px"
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(420px,1.4fr) minmax(300px,0.7fr)",
    gap: "25px"
  },

  mapCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "18px",
    borderRadius: "24px"
  },

  map: {
    height: "680px",
    width: "100%",
    borderRadius: "20px"
  },

  emptyMap: {
    height: "680px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "20px"
  },

  sidePanel: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },

  driverCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "24px",
    borderRadius: "24px",
    textAlign: "center"
  },

  driverIcon: {
    width: "105px",
    height: "105px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px"
  },

  callButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "14px",
    padding: "12px 16px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: "bold"
  },

  hospitalList: {
    background: "rgba(255,255,255,0.1)",
    padding: "22px",
    borderRadius: "24px"
  },

  hospitalItem: {
    background: "rgba(255,255,255,0.09)",
    padding: "16px",
    borderRadius: "16px",
    marginBottom: "14px"
  },

  routeButton: {
    display: "inline-block",
    padding: "9px 13px",
    borderRadius: "11px",
    background:
      "linear-gradient(to right,#f59e0b,#f97316)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default DriverTracking;