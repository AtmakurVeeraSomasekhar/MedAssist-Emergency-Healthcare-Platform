import React, {
  useEffect,
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";

import {
  createPrescription,
  getPrescriptionsByRoom
} from "../services/prescriptionApi";

function ConsultationRoom() {

  const navigate = useNavigate();

  const doctor =
    JSON.parse(
      localStorage.getItem("doctor")
    );

  const roomId =
    localStorage.getItem("activeRoomId")
    || "demo_room";

  const patientId =
    localStorage.getItem("activePatientId")
    || "P101";

  const [prescriptions, setPrescriptions] =
    useState([]);

  const [formData, setFormData] =
    useState({
      patientName: "Rahul",
      diagnosis: "",
      medicines: "",
      dosage: "",
      duration: "",
      advice: ""
    });

  const patientReports = {
    bloodGroup: "B+",
    medicalHistory:
      "No major surgery. Mild asthma history.",
    currentMedicines:
      "Vitamin D, Cough syrup",
    allergies:
      "Penicillin allergy",
    vitals: {
      heartRate: "92 bpm",
      bp: "120/80",
      oxygen: "97%",
      temperature: "98.6°F"
    },
    pastReports: [
      "Blood Report.pdf",
      "Chest X-Ray.png",
      "ECG Report.pdf"
    ]
  };

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions =
    async () => {

      try {

        const data =
          await getPrescriptionsByRoom(
            roomId
          );

        setPrescriptions(
          Array.isArray(data)
          ? data
          : []
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      const prescriptionData = {
        roomId,
        patientId,
        doctorId:
          doctor?.id || "doctor-demo",
        ...formData
      };

      const savedPrescription =
        await createPrescription(
          prescriptionData
        );

      generatePDF(savedPrescription);

      alert(
        "Prescription created successfully"
      );

      setFormData({
        patientName: "Rahul",
        diagnosis: "",
        medicines: "",
        dosage: "",
        duration: "",
        advice: ""
      });

      loadPrescriptions();
    };

  const generatePDF =
    (prescription) => {

      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text(
        "MedCare Digital Prescription",
        20,
        20
      );

      doc.setFontSize(12);

      doc.text(
        `Doctor: Dr. ${doctor?.fullName || "Doctor"}`,
        20,
        40
      );

      doc.text(
        `Patient: ${prescription.patientName}`,
        20,
        50
      );

      doc.text(
        `Diagnosis: ${prescription.diagnosis}`,
        20,
        65
      );

      doc.text(
        `Medicine: ${prescription.medicines}`,
        20,
        80
      );

      doc.text(
        `Dosage: ${prescription.dosage}`,
        20,
        95
      );

      doc.text(
        `Duration: ${prescription.duration}`,
        20,
        110
      );

      doc.text(
        `Advice: ${prescription.advice}`,
        20,
        125
      );

      doc.text(
        `Date: ${new Date().toLocaleString()}`,
        20,
        145
      );

      doc.save(
        `Prescription_${prescription.patientName}.pdf`
      );
    };

  return (

    <div style={styles.page}>

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            🩺 Consultation Room
          </h1>

          <p style={styles.subtitle}>
            Room: {roomId}
          </p>
        </div>

        <div style={styles.headerActions}>

          <button
            style={styles.chatBtn}
            onClick={() =>
              navigate("/chat")
            }
          >
            Open Chat
          </button>

          <button
            style={styles.videoBtn}
            onClick={() =>
              navigate("/video-consultation")
            }
          >
            Start Video
          </button>

        </div>

      </div>

      <div style={styles.grid}>

        {/* PATIENT REPORTS PANEL */}

        <section style={styles.panel}>

          <h2>
            Patient Reports
          </h2>

          <div style={styles.infoCard}>
            <b>Blood Group:</b>
            <span>{patientReports.bloodGroup}</span>
          </div>

          <div style={styles.infoCard}>
            <b>Medical History:</b>
            <span>{patientReports.medicalHistory}</span>
          </div>

          <div style={styles.infoCard}>
            <b>Current Medicines:</b>
            <span>{patientReports.currentMedicines}</span>
          </div>

          <div style={styles.infoCard}>
            <b>Allergies:</b>
            <span>{patientReports.allergies}</span>
          </div>

          <h3 style={styles.sectionTitle}>
            Vitals
          </h3>

          <div style={styles.vitalsGrid}>

            <div style={styles.vitalBox}>
              ❤️ {patientReports.vitals.heartRate}
            </div>

            <div style={styles.vitalBox}>
              🩸 {patientReports.vitals.bp}
            </div>

            <div style={styles.vitalBox}>
              🫁 {patientReports.vitals.oxygen}
            </div>

            <div style={styles.vitalBox}>
              🌡️ {patientReports.vitals.temperature}
            </div>

          </div>

          <h3 style={styles.sectionTitle}>
            Past Reports
          </h3>

          {
            patientReports.pastReports.map(
              (report, index) => (

              <div
                key={index}
                style={styles.reportItem}
              >
                📄 {report}
              </div>
            ))
          }

        </section>

        {/* PRESCRIPTION PANEL */}

        <section style={styles.panel}>

          <h2>
            Digital Prescription
          </h2>

          <form
            onSubmit={handleSubmit}
            style={styles.form}
          >

            <input
              name="patientName"
              placeholder="Patient Name"
              value={formData.patientName}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <textarea
              name="diagnosis"
              placeholder="Diagnosis / Symptoms"
              value={formData.diagnosis}
              onChange={handleChange}
              style={styles.textarea}
              required
            />

            <textarea
              name="medicines"
              placeholder="Medicine Name e.g. Paracetamol 650mg"
              value={formData.medicines}
              onChange={handleChange}
              style={styles.textarea}
              required
            />

            <input
              name="dosage"
              placeholder="Dosage e.g. 2 times daily"
              value={formData.dosage}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <input
              name="duration"
              placeholder="Duration e.g. 5 days"
              value={formData.duration}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <textarea
              name="advice"
              placeholder="Doctor Advice"
              value={formData.advice}
              onChange={handleChange}
              style={styles.textarea}
            />

            <button
              type="submit"
              style={styles.createBtn}
            >
              Generate Prescription PDF
            </button>

          </form>

        </section>

        {/* PRESCRIPTION HISTORY */}

        <section style={styles.panel}>

          <h2>
            Prescription History
          </h2>

          {
            prescriptions.length === 0 ? (

              <p style={styles.emptyText}>
                No prescriptions yet
              </p>

            ) : (

              prescriptions.map(
                (item) => (

                <div
                  key={item.id}
                  style={styles.prescriptionCard}
                >

                  <h3>
                    {item.patientName}
                  </h3>

                  <p>
                    <b>Medicine:</b> {item.medicines}
                  </p>

                  <p>
                    <b>Dosage:</b> {item.dosage}
                  </p>

                  <p>
                    <b>Duration:</b> {item.duration}
                  </p>

                  <button
                    style={styles.downloadBtn}
                    onClick={() =>
                      generatePDF(item)
                    }
                  >
                    Download PDF
                  </button>

                </div>
              ))
            )
          }

        </section>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#1e3a8a)",
    padding: "35px",
    color: "white"
  },

  header: {
    background:
      "rgba(255,255,255,0.12)",
    backdropFilter: "blur(14px)",
    borderRadius: "24px",
    padding: "25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  title: {
    margin: 0,
    fontSize: "36px"
  },

  subtitle: {
    color: "#cbd5e1"
  },

  headerActions: {
    display: "flex",
    gap: "15px"
  },

  chatBtn: {
    padding: "13px 20px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  videoBtn: {
    padding: "13px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "1.1fr 1.2fr 1fr",
    gap: "24px"
  },

  panel: {
    background: "white",
    color: "#0f172a",
    borderRadius: "24px",
    padding: "25px",
    boxShadow:
      "0 18px 50px rgba(0,0,0,0.25)"
  },

  infoCard: {
    background: "#f8fafc",
    padding: "14px",
    borderRadius: "14px",
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  sectionTitle: {
    marginTop: "22px"
  },

  vitalsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,1fr)",
    gap: "12px"
  },

  vitalBox: {
    background: "#eff6ff",
    padding: "15px",
    borderRadius: "14px",
    fontWeight: "bold"
  },

  reportItem: {
    background: "#f1f5f9",
    padding: "14px",
    borderRadius: "14px",
    marginBottom: "10px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none"
  },

  textarea: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    minHeight: "85px",
    resize: "vertical"
  },

  createBtn: {
    padding: "15px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    border: "none",
    color: "white",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  emptyText: {
    color: "#64748b"
  },

  prescriptionCard: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "16px",
    marginBottom: "14px"
  },

  downloadBtn: {
    padding: "11px 16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ConsultationRoom;