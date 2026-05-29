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
  FaPhone,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaUserInjured,
  FaClock,
  FaRoute,
  FaComments,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserShield
} from "react-icons/fa";

import "leaflet/dist/leaflet.css";

import {
  getAmbulanceRequests
} from "../services/api";

import {
  connectSocket,
  disconnectSocket
} from "../services/socket";

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

function AmbulanceStatus() {
  const [allRequests, setAllRequests] =
    useState([]);

  const [patientRequest, setPatientRequest] =
    useState(null);

  const [patientLocation, setPatientLocation] =
    useState(null);

  const [ambulanceLocation, setAmbulanceLocation] =
    useState(null);

  const [hospitals, setHospitals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const patient =
    JSON.parse(
      localStorage.getItem("patient")
    ) || {};

  useEffect(() => {
    loadPatientStatus();

    connectSocket((updatedRequest) => {
      const updatedId =
        updatedRequest.id || updatedRequest._id;

      setAllRequests((prev) =>
        prev.map((req) => {
          const reqId =
            req.id || req._id;

          return reqId === updatedId
            ? updatedRequest
            : req;
        })
      );

      const currentId =
        patientRequest?.id ||
        patientRequest?._id;

      if (currentId === updatedId) {
        setPatientRequest(updatedRequest);
        localStorage.setItem(
          "latestAmbulanceRequest",
          JSON.stringify(updatedRequest)
        );
      }
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (patientRequest) {
      const parsedLocation =
        extractLatLng(
          patientRequest.location
        );

      if (parsedLocation) {
        setPatientLocation(parsedLocation);
        fetchNearbyHospitals(
          parsedLocation[0],
          parsedLocation[1]
        );

        setAmbulanceLocation([
          parsedLocation[0] + 0.006,
          parsedLocation[1] + 0.006
        ]);
      } else {
        getBrowserLocation();
      }
    }
  }, [patientRequest]);

  useEffect(() => {
    if (!patientLocation || !ambulanceLocation) {
      return;
    }

    const interval =
      setInterval(() => {
        setAmbulanceLocation((prev) => {
          const latDiff =
            patientLocation[0] - prev[0];

          const lngDiff =
            patientLocation[1] - prev[1];

          return [
            prev[0] + latDiff * 0.18,
            prev[1] + lngDiff * 0.18
          ];
        });
      }, 3000);

    return () =>
      clearInterval(interval);

  }, [patientLocation, ambulanceLocation]);

  const loadPatientStatus =
    async () => {
      try {
        setLoading(true);

        const data =
          await getAmbulanceRequests();

        const requests =
          Array.isArray(data)
            ? data
            : [];

        setAllRequests(requests);

        const latestLocal =
          JSON.parse(
            localStorage.getItem(
              "latestAmbulanceRequest"
            )
          );

        const patientId =
          patient.id || patient._id;

        const filtered =
          requests.filter((req) => {
            return (
              req.patientId === patientId ||
              req.patientName === patient.name ||
              req.phone === patient.phone ||
              req.id === latestLocal?.id ||
              req._id === latestLocal?._id
            );
          });

        const latest =
          filtered.length > 0
            ? filtered[filtered.length - 1]
            : latestLocal;

        setPatientRequest(latest || null);

      } catch (error) {
        console.log(error);
        alert(
          "Failed to load ambulance status"
        );
      } finally {
        setLoading(false);
      }
    };

  const getBrowserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const current = [
          position.coords.latitude,
          position.coords.longitude
        ];

        setPatientLocation(current);

        setAmbulanceLocation([
          current[0] + 0.006,
          current[1] + 0.006
        ]);

        fetchNearbyHospitals(
          current[0],
          current[1]
        );
      },
      () => {
        console.log(
          "Location permission denied"
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

        const hospitalList =
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

        setHospitals(hospitalList);
      } catch (error) {
        console.log(error);
      }
    };

  const extractLatLng = (location) => {
    if (!location) {
      return null;
    }

    const match =
      location.match(
        /q=(-?\d+\.?\d*),(-?\d+\.?\d*)/
      );

    if (match) {
      return [
        parseFloat(match[1]),
        parseFloat(match[2])
      ];
    }

    return null;
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f59e0b";

      case "Accepted":
      case "DRIVER_ASSIGNED":
      case "Driver Assigned":
        return "#2563eb";

      case "Arriving":
        return "#7c3aed";

      case "Completed":
        return "#10b981";

      default:
        return "#ef4444";
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case "Pending":
        return "Waiting for ambulance driver acceptance";

      case "Accepted":
      case "DRIVER_ASSIGNED":
      case "Driver Assigned":
        return "Driver accepted your emergency request";

      case "Arriving":
        return "Ambulance is arriving towards your location";

      case "Completed":
        return "Emergency trip completed";

      default:
        return "Emergency request is under process";
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "Time not available";
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };

  const driverName =
    patientRequest?.driverName ||
    patientRequest?.driverFullName ||
    "Driver will be assigned soon";

  const driverPhone =
    patientRequest?.driverPhone ||
    patientRequest?.driverContact ||
    "Not available yet";

  const ambulanceNumber =
    patientRequest?.ambulanceNumber ||
    "Waiting for driver assignment";

  const distance =
    patientLocation && ambulanceLocation
      ? calculateDistance(
          patientLocation[0],
          patientLocation[1],
          ambulanceLocation[0],
          ambulanceLocation[1]
        )
      : "N/A";

  const eta =
    distance !== "N/A"
      ? `${Math.max(
          3,
          Math.ceil(distance * 3)
        )} mins`
      : "Calculating";

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <div style={styles.headerLeft}>
          <FaAmbulance
            style={styles.headerIcon}
          />

          <div>
            <h1 style={styles.title}>
              Patient Ambulance Status Portal
            </h1>

            <p style={styles.subtitle}>
              Track your emergency request, driver acceptance, live location, hospital distance and route.
            </p>
          </div>
        </div>

        <button
          style={styles.refreshButton}
          onClick={loadPatientStatus}
        >
          Refresh Status
        </button>

      </div>

      {
        loading ? (

          <div style={styles.emptyBox}>
            Loading your ambulance status...
          </div>

        ) : !patientRequest ? (

          <div style={styles.emptyBox}>
            <FaExclamationTriangle
              style={styles.emptyIcon}
            />
            <h2>
              No ambulance request found
            </h2>
            <p>
              Please book an ambulance from the patient dashboard first.
            </p>
          </div>

        ) : (

          <>

            <div style={styles.statusHero}>

              <div>
                <span
                  style={{
                    ...styles.statusBadge,
                    background:
                      getStatusColor(
                        patientRequest.status
                      )
                  }}
                >
                  {
                    patientRequest.status ||
                    "Pending"
                  }
                </span>

                <h2 style={styles.heroTitle}>
                  {
                    getStatusMessage(
                      patientRequest.status
                    )
                  }
                </h2>

                <p style={styles.heroText}>
                  Your emergency request is being monitored in real time.
                  Keep your phone active and stay at the marked pickup location.
                </p>
              </div>

              <div style={styles.etaCard}>
                <FaClock style={styles.etaIcon} />
                <h1>{eta}</h1>
                <p>Estimated Arrival</p>
              </div>

            </div>

            <div style={styles.statsGrid}>

              <div style={styles.infoCard}>
                <FaUserInjured style={styles.cardIcon} />
                <h3>Patient</h3>
                <p>
                  {
                    patientRequest.patientName ||
                    patient.name ||
                    "Patient"
                  }
                </p>
              </div>

              <div style={styles.infoCard}>
                <FaHeartbeat style={styles.cardIcon} />
                <h3>Emergency</h3>
                <p>
                  {
                    patientRequest.emergencyType ||
                    patientRequest.symptoms ||
                    "Emergency"
                  }
                </p>
              </div>

              <div style={styles.infoCard}>
                <FaAmbulance style={styles.cardIcon} />
                <h3>Ambulance</h3>
                <p>{ambulanceNumber}</p>
              </div>

              <div style={styles.infoCard}>
                <FaRoute style={styles.cardIcon} />
                <h3>Distance</h3>
                <p>{distance} KM</p>
              </div>

            </div>

            <div style={styles.contentGrid}>

              <div style={styles.driverCard}>

                <h2 style={styles.cardTitle}>
                  <FaUserShield />
                  Driver Information
                </h2>

                <div style={styles.driverAvatar}>
                  🚑
                </div>

                <h2>{driverName}</h2>

                <p>
                  Ambulance No: {ambulanceNumber}
                </p>

                <p>
                  Driver Contact: {driverPhone}
                </p>

                <p>
                  Request Time: {formatDate(patientRequest.createdAt)}
                </p>

                <div style={styles.actionRow}>

                  <a
                    href={
                      driverPhone !== "Not available yet"
                        ? `tel:${driverPhone}`
                        : "#"
                    }
                    style={styles.callButton}
                  >
                    <FaPhone />
                    Call Driver
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

              <div style={styles.mapCard}>

                <h2 style={styles.cardTitle}>
                  <FaMapMarkerAlt />
                  Live Patient & Ambulance Map
                </h2>

                {
                  patientLocation &&
                  ambulanceLocation ? (

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
                          📍 Patient Pickup Location
                        </Popup>
                      </Marker>

                      <Marker
                        position={ambulanceLocation}
                        icon={ambulanceIcon}
                      >
                        <Popup>
                          🚑 Ambulance Live Location
                        </Popup>
                      </Marker>

                      <Polyline
                        positions={[
                          ambulanceLocation,
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
                      Location loading...
                    </div>
                  )
                }

              </div>

            </div>

            <div style={styles.hospitalSection}>

              <h2 style={styles.cardTitle}>
                <FaHospital />
                Nearby Hospitals From Patient Location
              </h2>

              <div style={styles.hospitalGrid}>

                {
                  hospitals.length === 0 ? (

                    <div style={styles.emptyBox}>
                      Nearby hospitals loading...
                    </div>

                  ) : (

                    hospitals.map((hospital) => (

                      <div
                        key={hospital.id}
                        style={styles.hospitalCard}
                      >

                        <h3>
                          {hospital.name}
                        </h3>

                        <p>
                          Distance: {hospital.distance} KM
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

            <div style={styles.timeline}>

              <h2 style={styles.cardTitle}>
                Emergency Timeline
              </h2>

              {
                [
                  "Pending",
                  "Accepted",
                  "Arriving",
                  "Completed"
                ].map((step) => (

                  <div
                    key={step}
                    style={styles.timelineItem}
                  >
                    <FaCheckCircle
                      color={
                        patientRequest.status === step ||
                        patientRequest.status === "DRIVER_ASSIGNED"
                          ? "#22c55e"
                          : "#64748b"
                      }
                    />

                    <span>{step}</span>
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
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
    padding: "35px",
    color: "white"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },

  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "18px"
  },

  headerIcon: {
    fontSize: "58px",
    color: "#ef4444"
  },

  title: {
    fontSize: "38px",
    margin: 0
  },

  subtitle: {
    color: "#cbd5e1",
    marginTop: "8px",
    maxWidth: "850px"
  },

  refreshButton: {
    padding: "13px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  emptyBox: {
    background: "rgba(255,255,255,0.1)",
    padding: "35px",
    borderRadius: "24px",
    textAlign: "center"
  },

  emptyIcon: {
    fontSize: "50px",
    color: "#f59e0b"
  },

  statusHero: {
    background:
      "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(14,165,233,0.12))",
    border:
      "1px solid rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "28px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "25px"
  },

  statusBadge: {
    padding: "9px 18px",
    borderRadius: "30px",
    fontWeight: "bold",
    display: "inline-block"
  },

  heroTitle: {
    fontSize: "34px",
    marginBottom: "12px"
  },

  heroText: {
    color: "#cbd5e1",
    lineHeight: "1.7"
  },

  etaCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "25px",
    borderRadius: "22px",
    textAlign: "center",
    minWidth: "210px"
  },

  etaIcon: {
    fontSize: "38px",
    color: "#38bdf8"
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px"
  },

  infoCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "22px",
    borderRadius: "22px",
    textAlign: "center"
  },

  cardIcon: {
    fontSize: "34px",
    color: "#38bdf8"
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(300px,0.8fr) minmax(400px,1.4fr)",
    gap: "25px",
    marginBottom: "25px"
  },

  driverCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "26px",
    borderRadius: "24px",
    textAlign: "center"
  },

  cardTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "18px"
  },

  driverAvatar: {
    width: "110px",
    height: "110px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px"
  },

  actionRow: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap"
  },

  callButton: {
    padding: "12px 16px",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },

  chatButton: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    gap: "8px",
    alignItems: "center"
  },

  mapCard: {
    background: "rgba(255,255,255,0.1)",
    padding: "22px",
    borderRadius: "24px"
  },

  map: {
    height: "520px",
    width: "100%",
    borderRadius: "20px"
  },

  emptyMap: {
    height: "520px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "20px"
  },

  hospitalSection: {
    background: "rgba(255,255,255,0.1)",
    padding: "24px",
    borderRadius: "24px",
    marginBottom: "25px"
  },

  hospitalGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "18px"
  },

  hospitalCard: {
    background: "rgba(255,255,255,0.09)",
    padding: "18px",
    borderRadius: "18px"
  },

  routeButton: {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 14px",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#f59e0b,#f97316)",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
  },

  timeline: {
    background: "rgba(255,255,255,0.1)",
    padding: "24px",
    borderRadius: "24px"
  },

  timelineItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)"
  }
};

export default AmbulanceStatus;