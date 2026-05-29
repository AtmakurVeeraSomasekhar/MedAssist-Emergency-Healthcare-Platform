import React, {
  useEffect,
  useState
} from "react";

import {
  getHospitals
} from "../services/hospitalApi";

function NearbyHospitals() {

  const [hospitals, setHospitals] =
    useState([]);

  useEffect(() => {

    fetchHospitals();

  }, []);

  const fetchHospitals =
    async () => {

      try {

        const data =
          await getHospitals();

        setHospitals(data);

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div style={styles.container}>

      <h1 style={styles.heading}>
        🚑 Nearby Hospitals
      </h1>

      <div style={styles.grid}>

        {hospitals.map((hospital) => (

          <div
            key={hospital._id}
            style={styles.card}
          >

            <img
              src={hospital.image}
              alt={hospital.name}
              style={styles.image}
            />

            <h2>{hospital.name}</h2>

            <p>
              📍 {hospital.address}
            </p>

            <p>
              ⭐ {hospital.rating}
            </p>

            <p>
              📏 {hospital.distance}
            </p>

            <p>

              {
                hospital.emergencyAvailable
                ? "🟢 Emergency Available"
                : "🔴 Not Available"
              }

            </p>

            <div style={styles.buttonRow}>

              <a
                href={`tel:${hospital.phone}`}
                style={styles.callBtn}
              >
                Call
              </a>

              <button
                style={styles.directionBtn}
              >
                Directions
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

const styles = {

  container: {
    padding: "40px",
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#0f172a,#1e3a8a)"
  },

  heading: {
    textAlign: "center",
    color: "white",
    marginBottom: "40px",
    fontSize: "42px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "30px"
  },

  card: {
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.3)",
    transition: "0.3s"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover"
  },

  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px"
  },

  callBtn: {
    background: "#16a34a",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontWeight: "bold"
  },

  directionBtn: {
    background: "#2563eb",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default NearbyHospitals;