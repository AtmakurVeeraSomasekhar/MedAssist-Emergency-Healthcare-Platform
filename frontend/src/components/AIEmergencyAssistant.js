import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AIEmergencyAssistant() {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState(null);
  const [matchedDoctor, setMatchedDoctor] = useState(null);
  const [listening, setListening] = useState(false);

  const doctors = [
    {
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      distance: "2.1 km",
      status: "Available"
    },
    {
      name: "Dr. Priya Sharma",
      specialization: "Neurologist",
      distance: "3.4 km",
      status: "Busy"
    },
    {
      name: "Dr. Arjun Reddy",
      specialization: "Emergency Specialist",
      distance: "1.8 km",
      status: "Available"
    },
    {
      name: "Dr. Meena Rao",
      specialization: "General Physician",
      distance: "4.2 km",
      status: "Available"
    }
  ];

  const analyzeSymptoms = () => {
    const text = symptoms.toLowerCase();

    let result = {
      level: "LOW",
      color: "#16a34a",
      message: "Low risk. You can consult a general doctor.",
      action: "Consult Doctor"
    };

    if (
      text.includes("chest pain") ||
      text.includes("heart") ||
      text.includes("breathing") ||
      text.includes("unconscious") ||
      text.includes("stroke") ||
      text.includes("accident") ||
      text.includes("bleeding")
    ) {
      result = {
        level: "HIGH",
        color: "#dc2626",
        message: "High emergency risk. Ambulance and emergency doctor recommended.",
        action: "Auto Dispatch Ambulance"
      };
    } else if (
      text.includes("fever") ||
      text.includes("vomiting") ||
      text.includes("dizziness") ||
      text.includes("weakness") ||
      text.includes("headache")
    ) {
      result = {
        level: "MEDIUM",
        color: "#f59e0b",
        message: "Medium risk. Doctor consultation is recommended.",
        action: "Find Nearby Doctor"
      };
    }

    setSeverity(result);
    matchDoctor(text, result.level);
  };

  const matchDoctor = (text, level) => {
    let doctor = doctors.find(
      (d) => d.specialization === "Emergency Specialist" && d.status === "Available"
    );

    if (text.includes("chest") || text.includes("heart")) {
      doctor = doctors.find((d) => d.specialization === "Cardiologist");
    } else if (text.includes("head") || text.includes("stroke")) {
      doctor = doctors.find((d) => d.specialization === "Neurologist");
    } else if (level === "LOW") {
      doctor = doctors.find((d) => d.specialization === "General Physician");
    }

    setMatchedDoctor(doctor);
  };

  const autoDispatchAmbulance = () => {
    localStorage.setItem(
      "aiEmergencyData",
      JSON.stringify({
        symptoms,
        severity: severity?.level,
        doctor: matchedDoctor,
        createdAt: new Date().toISOString()
      })
    );

    alert("🚑 Ambulance dispatch initiated based on AI emergency severity");
    navigate("/ambulance");
  };

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice assistant is not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setSymptoms(voiceText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice input failed. Try again.");
    };
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>🤖 AI Emergency Assistant</h1>
        <p style={styles.subtitle}>
          Enter symptoms or use voice. The system predicts emergency severity and suggests next action.
        </p>
      </div>

      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Example: chest pain, breathing problem, fever, accident, bleeding..."
        style={styles.textarea}
      />

      <div style={styles.buttonRow}>
        <button style={styles.voiceBtn} onClick={startVoiceInput}>
          {listening ? "Listening..." : "🎙 Voice Assistant"}
        </button>

        <button style={styles.analyzeBtn} onClick={analyzeSymptoms}>
          Analyze Emergency
        </button>
      </div>

      {severity && (
        <div style={styles.resultGrid}>
          <div style={styles.resultCard}>
            <h2>Emergency Prediction</h2>

            <div
              style={{
                ...styles.severityBadge,
                background: severity.color
              }}
            >
              {severity.level}
            </div>

            <p>{severity.message}</p>
          </div>

          <div style={styles.resultCard}>
            <h2>Nearby Doctor Match</h2>

            {matchedDoctor ? (
              <>
                <h3>{matchedDoctor.name}</h3>
                <p>{matchedDoctor.specialization}</p>
                <p>Distance: {matchedDoctor.distance}</p>
                <p>Status: {matchedDoctor.status}</p>
              </>
            ) : (
              <p>No doctor matched</p>
            )}
          </div>

          <div style={styles.resultCard}>
            <h2>Recommended Action</h2>

            <button
              style={
                severity.level === "HIGH"
                  ? styles.emergencyBtn
                  : styles.consultBtn
              }
              onClick={
                severity.level === "HIGH"
                  ? autoDispatchAmbulance
                  : () => navigate("/chat")
              }
            >
              {severity.action}
            </button>
          </div>
        </div>
      )}

      <p style={styles.note}>
        Note: This AI assistant is for emergency prioritization support only, not final medical diagnosis.
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: "40px",
    background: "rgba(255,255,255,0.09)",
    padding: "30px",
    borderRadius: "28px",
    color: "white",
    boxShadow: "0 12px 40px rgba(0,0,0,0.35)"
  },
  header: {
    marginBottom: "22px"
  },
  title: {
    fontSize: "34px",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: "16px"
  },
  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "18px",
    borderRadius: "18px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    resize: "vertical"
  },
  buttonRow: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap"
  },
  voiceBtn: {
    padding: "15px 24px",
    border: "none",
    borderRadius: "14px",
    background: "#7c3aed",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  analyzeBtn: {
    padding: "15px 24px",
    border: "none",
    borderRadius: "14px",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  resultGrid: {
    marginTop: "25px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px"
  },
  resultCard: {
    background: "white",
    color: "#0f172a",
    padding: "22px",
    borderRadius: "22px"
  },
  severityBadge: {
    display: "inline-block",
    color: "white",
    padding: "10px 18px",
    borderRadius: "30px",
    fontWeight: "bold",
    marginBottom: "12px"
  },
  emergencyBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background: "#dc2626",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  consultBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "14px",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  note: {
    marginTop: "18px",
    color: "#cbd5e1",
    fontSize: "14px"
  }
};

export default AIEmergencyAssistant;