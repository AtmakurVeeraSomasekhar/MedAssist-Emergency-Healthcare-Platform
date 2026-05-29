import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIEmergencyAssistant from "../components/AIEmergencyAssistant";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import {
  FaAmbulance,
  FaHospital,
  FaUserMd,
  FaPhoneAlt,
  FaComments,
  FaVideo,
  //FaMapMarkerAlt,
  //FaHeartbeat,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  //FaRobot,
  FaShieldAlt,
  FaClock,
  FaRoute,
  FaUpload,
  FaLocationArrow,
  FaBell,
  //FaCheckCircle,
  FaUserCircle
} from "react-icons/fa";

import {
  requestAmbulance
} from "../services/api";

const patientIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [28, 45],
  iconAnchor: [14, 45]
});

const hospitalIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/4320/4320371.png",
  iconSize: [34, 34],
  iconAnchor: [17, 34]
});

const ambulanceIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38]
});

function Dashboard() {

  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState("overview");

  const [location, setLocation] =
    useState(null);

  const [hospitals, setHospitals] =
    useState([]);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedDoctor, setSelectedDoctor] =
    useState(null);

  const [appointmentData, setAppointmentData] =
    useState({
      patientName: "",
      appointmentDate: "",
      appointmentTime: ""
    });

  const [ambulanceForm, setAmbulanceForm] =
    useState({
      emergencyType: "",
      symptoms: "",
      severity: "Medium",
      phone: ""
    });

  const [latestAmbulanceRequest, setLatestAmbulanceRequest] =
    useState(null);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const patient =
    JSON.parse(
      localStorage.getItem("patient")
    ) || {};

  const patientName =
    patient.name ||
    patient.fullName ||
    "Patient";

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }

  }, [navigate]);

  useEffect(() => {

    const timer =
      setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

    return () =>
      clearInterval(timer);

  }, []);

  const doctors = [

    {
      name: "Dr. Rajesh Kumar",
      specialization: "Cardiologist",
      experience: "12 Years",
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg",
      phone: "9876543210",
      rating: "4.9",
      available: "Online"
    },

    {
      name: "Dr. Priya Sharma",
      specialization: "Neurologist",
      experience: "9 Years",
      image:
        "https://img.freepik.com/free-photo/young-female-doctor-white-coat-with-stethoscope_1303-29791.jpg",
      phone: "9876543211",
      rating: "4.8",
      available: "Online"
    },

    {
      name: "Dr. Arjun Reddy",
      specialization: "Emergency Specialist",
      experience: "15 Years",
      image:
        "https://img.freepik.com/free-photo/medium-shot-doctor-with-crossed-arms_23-2148868176.jpg",
      phone: "9876543212",
      rating: "4.9",
      available: "Busy"
    }
  ];

  const ambulancePosition =
    location
      ? [
          location[0] + 0.006,
          location[1] + 0.006
        ]
      : null;

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("patient");

    navigate("/login");
  };

  const getLocation = () => {

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        setLocation([
          lat,
          lon
        ]);

        fetchNearbyHospitals(
          lat,
          lon
        );

        alert(
          "Location detected successfully"
        );
      },

      () => {
        alert(
          "Location access denied"
        );
      }
    );
  };

  const fetchNearbyHospitals = async (
    lat,
    lon
  ) => {

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

      setHospitals(
        data.elements || []
      );

    } catch (error) {

      console.log(error);

      alert(
        "Error fetching hospitals"
      );
    }
  };

  const handleAmbulanceChange = (e) => {

    setAmbulanceForm({
      ...ambulanceForm,
      [e.target.name]:
        e.target.value
    });
  };

  const bookAmbulance = async () => {

    if (!location) {
      alert(
        "Please detect your live location first"
      );

      return;
    }

    if (
      !ambulanceForm.emergencyType ||
      !ambulanceForm.phone
    ) {
      alert(
        "Please fill emergency type and phone number"
      );

      return;
    }

    try {

      const requestData = {
        patientId:
          patient.id || patient._id || "",
        patientName:
          patientName,
        phone:
          ambulanceForm.phone,
        emergencyType:
          ambulanceForm.emergencyType,
        symptoms:
          ambulanceForm.symptoms,
        severity:
          ambulanceForm.severity,
        location:
          `https://www.google.com/maps?q=${location[0]},${location[1]}`,
        distance:
          "Nearby",
        status:
          "Pending"
      };

      const response =
        await requestAmbulance(
          requestData
        );

      setLatestAmbulanceRequest(
        response
      );

      localStorage.setItem(
        "latestAmbulanceRequest",
        JSON.stringify(response)
      );

      alert(
        "Ambulance request created successfully"
      );

      setActiveSection("tracking");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Ambulance booking failed"
      );
    }
  };

  const sendEmergencyMessage = () => {

    if (!location) {
      alert(
        "Please get location first"
      );

      return;
    }

    const message =
      `🚨 EMERGENCY HELP NEEDED 🚨\n\n`
      + `Patient: ${patientName}\n`
      + `Live Location:\n`
      + `https://www.google.com/maps?q=${location[0]},${location[1]}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    alert(
      "Emergency message prepared"
    );
  };

  const openBookingModal = (doctor) => {

    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const confirmAppointment = () => {

    if (
      !appointmentData.patientName ||
      !appointmentData.appointmentDate ||
      !appointmentData.appointmentTime
    ) {
      alert(
        "Please fill all appointment details"
      );

      return;
    }

    alert(
      `Appointment Booked Successfully!\n\nDoctor: ${selectedDoctor.name}\nPatient: ${appointmentData.patientName}`
    );

    setShowModal(false);

    setAppointmentData({
      patientName: "",
      appointmentDate: "",
      appointmentTime: ""
    });
  };

  const handleAppointmentChange = (e) => {

    setAppointmentData({
      ...appointmentData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleFileUpload = (event) => {

    const file =
      event.target.files[0];

    if (file) {

      const fileURL =
        URL.createObjectURL(file);

      setSelectedFile({
        file,
        preview: fileURL
      });
    }
  };

  const renderOverview = () => (

    <>

      <section style={styles.heroSection}>

        <div style={styles.heroContent}>

          <span style={styles.heroBadge}>
            <FaShieldAlt />
            Trusted Emergency Healthcare Platform
          </span>

          <h1 style={styles.heroTitle}>
            Smart Emergency
            <br />
            Healthcare System
          </h1>

          <p style={styles.heroText}>
            Get ambulance support, nearby hospitals, doctor consultation,
            AI emergency guidance, medical records and live tracking from one secure dashboard.
          </p>

          <div style={styles.buttonContainer}>

            <button
              style={styles.locationButton}
              onClick={getLocation}
            >
              <FaLocationArrow />
              Find Hospitals
            </button>

            <button
              style={styles.sosButton}
              onClick={() =>
                setActiveSection("ambulance")
              }
            >
              <FaAmbulance />
              Book Ambulance
            </button>

            <button
              style={styles.warningButton}
              onClick={sendEmergencyMessage}
            >
              <FaBell />
              Emergency SOS
            </button>

          </div>

        </div>

        <div style={styles.heroGraphic}>

          <img
            src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1513.jpg"
            alt="medical"
            style={styles.heroImage}
          />

        </div>

      </section>

      <div style={styles.statsContainer}>

        <div style={styles.statCard}>
          <FaHospital style={styles.statIcon} />
          <h1>{hospitals.length}</h1>
          <p>Nearby Hospitals</p>
        </div>

        <div style={styles.statCard}>
          <FaAmbulance style={styles.statIcon} />
          <h1>
            {
              latestAmbulanceRequest
                ? "Active"
                : "Ready"
            }
          </h1>
          <p>Ambulance Support</p>
        </div>

        <div style={styles.statCard}>
          <FaUserMd style={styles.statIcon} />
          <h1>{doctors.length}</h1>
          <p>Available Doctors</p>
        </div>

        <div style={styles.statCard}>
          <FaClock style={styles.statIcon} />
          <h1>
            {currentTime.toLocaleTimeString()}
          </h1>
          <p>Live System Time</p>
        </div>

      </div>

    </>
  );

  const renderHospitals = () => (

    <section style={styles.sectionCard}>

      <div style={styles.sectionHeader}>

        <div>
          <h1 style={styles.sectionTitle}>
            🏥 Nearby Hospitals Map
          </h1>

          <p style={styles.sectionSub}>
            Detect your location and view emergency hospitals around you.
          </p>
        </div>

        <button
          style={styles.locationButton}
          onClick={getLocation}
        >
          <FaLocationArrow />
          Detect Location
        </button>

      </div>

      {
        location ? (

          <MapContainer
            center={location}
            zoom={14}
            style={styles.map}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker
              position={location}
              icon={patientIcon}
            >
              <Popup>
                📍 Your Current Location
              </Popup>
            </Marker>

            {
              hospitals.map((hospital, index) => (

                <Marker
                  key={
                    hospital.id ||
                    index
                  }
                  position={[
                    hospital.lat,
                    hospital.lon
                  ]}
                  icon={hospitalIcon}
                >
                  <Popup>
                    <h3>
                      {
                        hospital.tags?.name ||
                        "Hospital"
                      }
                    </h3>

                    <p>
                      Emergency Healthcare Center
                    </p>
                  </Popup>
                </Marker>

              ))
            }

          </MapContainer>

        ) : (

          <div style={styles.emptyBox}>
            Please click Detect Location to load nearby hospitals.
          </div>
        )
      }

    </section>
  );

  const renderAmbulanceBooking = () => (

    <section style={styles.sectionCard}>

      <div style={styles.sectionHeader}>

        <div>
          <h1 style={styles.sectionTitle}>
            🚑 Emergency Ambulance Booking
          </h1>

          <p style={styles.sectionSub}>
            Create an emergency request and notify ambulance drivers.
          </p>
        </div>

        <button
          style={styles.locationButton}
          onClick={getLocation}
        >
          <FaLocationArrow />
          Get Location
        </button>

      </div>

      <div style={styles.ambulanceGrid}>

        <div style={styles.formCard}>

          <h2>
            Patient Emergency Details
          </h2>

          <input
            name="phone"
            placeholder="Emergency Contact Number"
            value={ambulanceForm.phone}
            onChange={handleAmbulanceChange}
            style={styles.input}
          />

          <select
            name="emergencyType"
            value={ambulanceForm.emergencyType}
            onChange={handleAmbulanceChange}
            style={styles.input}
          >
            <option value="">
              Select Emergency Type
            </option>

            <option value="Heart Attack">
              Heart Attack
            </option>

            <option value="Accident">
              Accident
            </option>

            <option value="Breathing Problem">
              Breathing Problem
            </option>

            <option value="Pregnancy Emergency">
              Pregnancy Emergency
            </option>

            <option value="Stroke">
              Stroke
            </option>

            <option value="Other Emergency">
              Other Emergency
            </option>
          </select>

          <select
            name="severity"
            value={ambulanceForm.severity}
            onChange={handleAmbulanceChange}
            style={styles.input}
          >
            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

            <option value="Critical">
              Critical
            </option>
          </select>

          <textarea
            name="symptoms"
            placeholder="Describe symptoms or emergency condition"
            value={ambulanceForm.symptoms}
            onChange={handleAmbulanceChange}
            style={styles.textarea}
          />

          <button
            style={styles.sosButton}
            onClick={bookAmbulance}
          >
            <FaAmbulance />
            Confirm Ambulance Booking
          </button>

        </div>

        <div style={styles.emergencyInfoCard}>

          <img
            src="https://img.freepik.com/free-vector/ambulance-concept-illustration_114360-9148.jpg"
            alt="ambulance"
            style={styles.emergencyImage}
          />

          <h2>
            How it works
          </h2>

          <p>
            1. Patient sends emergency request.
          </p>

          <p>
            2. Nearby ambulance driver receives request.
          </p>

          <p>
            3. Driver accepts and starts live tracking.
          </p>

          <p>
            4. Patient can view ambulance status and contact driver.
          </p>

        </div>

      </div>

    </section>
  );

  const renderTracking = () => (

    <section style={styles.sectionCard}>

      <div style={styles.sectionHeader}>

        <div>
          <h1 style={styles.sectionTitle}>
            🛰 Ambulance Status & Live Tracking
          </h1>

          <p style={styles.sectionSub}>
            Track ambulance location, status and driver communication.
          </p>
        </div>

      </div>

      <div style={styles.trackingGrid}>

        <div style={styles.statusPanel}>

          <FaAmbulance style={styles.bigIcon} />

          <h2>
            Ambulance Status
          </h2>

          <p>
            View current ambulance request status and updates.
          </p>

          <button
            style={styles.primaryAction}
            onClick={() =>
              navigate("/ambulance-status")
            }
          >
            Open Ambulance Status
          </button>

        </div>

        <div style={styles.statusPanel}>

          <FaRoute style={styles.bigIcon} />

          <h2>
            Live Driver Tracking
          </h2>

          <p>
            Track ambulance driver movement with live map.
          </p>

          <button
            style={styles.primaryAction}
            onClick={() =>
              navigate("/driver-tracking")
            }
          >
            Track Driver
          </button>

        </div>

        <div style={styles.statusPanel}>

          <FaComments style={styles.bigIcon} />

          <h2>
            Chat With Driver
          </h2>

          <p>
            Communicate instantly with the ambulance driver.
          </p>

          <button
            style={styles.primaryAction}
            onClick={() =>
              navigate("/chat")
            }
          >
            Open Chat
          </button>

        </div>

      </div>

      {
        location && ambulancePosition && (

          <div style={styles.mapContainer}>

            <h2 style={styles.mapTitle}>
              🚑 Patient & Ambulance Live Map
            </h2>

            <MapContainer
              center={location}
              zoom={14}
              style={styles.map}
            >

              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker
                position={location}
                icon={patientIcon}
              >
                <Popup>
                  Patient Location
                </Popup>
              </Marker>

              <Marker
                position={ambulancePosition}
                icon={ambulanceIcon}
              >
                <Popup>
                  Ambulance Driver Location
                </Popup>
              </Marker>

            </MapContainer>

          </div>
        )
      }

    </section>
  );

  const renderDoctors = () => (

    <section style={styles.sectionCard}>

      <h1 style={styles.sectionTitle}>
        👨‍⚕️ Available Doctors
      </h1>

      <p style={styles.sectionSub}>
        Connect through call, chat or video consultation.
      </p>

      <div style={styles.doctorGrid}>

        {
          doctors.map((doctor, index) => (

            <div
              key={index}
              style={styles.doctorCard}
            >

              <img
                src={doctor.image}
                alt="doctor"
                style={styles.doctorImage}
              />

              <span style={styles.onlineBadge}>
                {doctor.available}
              </span>

              <h2>
                {doctor.name}
              </h2>

              <p>
                {doctor.specialization}
              </p>

              <p>
                Experience: {doctor.experience}
              </p>

              <p>
                ⭐ {doctor.rating}
              </p>

              <div style={styles.doctorButtons}>

                <a
                  href={`tel:${doctor.phone}`}
                  style={styles.callButton}
                >
                  <FaPhoneAlt />
                  Call
                </a>

                <button
                  style={styles.chatButton}
                  onClick={() =>
                    navigate("/chat")
                  }
                >
                  <FaComments />
                  Chat
                </button>

                <button
                  style={styles.videoButton}
                  onClick={() =>
                    navigate("/video-consultation")
                  }
                >
                  <FaVideo />
                  Video
                </button>

              </div>

              <button
                style={styles.bookButton}
                onClick={() =>
                  openBookingModal(doctor)
                }
              >
                📅 Book Appointment
              </button>

            </div>
          ))
        }

      </div>

    </section>
  );

  const renderRecords = () => (

    <section style={styles.sectionCard}>

      <h1 style={styles.sectionTitle}>
        📂 Medical Records
      </h1>

      <p style={styles.sectionSub}>
        Upload reports, prescriptions, emergency images or medical videos.
      </p>

      <div style={styles.uploadCard}>

        <FaUpload style={styles.bigIcon} />

        <h2>
          Upload Medical File
        </h2>

        <input
          type="file"
          accept="image/*,video/*,.pdf"
          onChange={handleFileUpload}
          style={styles.fileInput}
        />

      </div>

      {
        selectedFile && (

          <div style={styles.previewContainer}>

            <h2>
              Uploaded Medical Preview
            </h2>

            {
              selectedFile.file.type.startsWith("image") ? (

                <img
                  src={selectedFile.preview}
                  alt="preview"
                  style={styles.imagePreview}
                />

              ) : selectedFile.file.type.startsWith("video") ? (

                <video
                  controls
                  style={styles.videoPreview}
                >
                  <source
                    src={selectedFile.preview}
                  />
                </video>

              ) : (

                <p>
                  PDF uploaded successfully: {selectedFile.file.name}
                </p>
              )
            }

          </div>
        )
      }

    </section>
  );

  const renderPrescription = () => (

    <section style={styles.sectionCard}>

      <h1 style={styles.sectionTitle}>
        💊 Prescription Center
      </h1>

      <p style={styles.sectionSub}>
        Store and manage prescriptions recommended by doctors.
      </p>

      <div style={styles.prescriptionGrid}>

        <div style={styles.prescriptionCard}>
          <FaPrescriptionBottleAlt style={styles.bigIcon} />
          <h2>Current Prescription</h2>
          <p>No active prescription uploaded yet.</p>
        </div>

        <div style={styles.prescriptionCard}>
          <FaFileMedical style={styles.bigIcon} />
          <h2>Doctor Notes</h2>
          <p>Consult with a doctor to receive digital prescription updates.</p>
        </div>

      </div>

    </section>
  );

  const renderAI = () => (

    <section style={styles.sectionCard}>

      <h1 style={styles.sectionTitle}>
        🤖 AI Emergency Assistant
      </h1>

      <p style={styles.sectionSub}>
        Get instant emergency guidance before doctor or ambulance support arrives.
      </p>

      <AIEmergencyAssistant />

    </section>
  );

  const renderProfile = () => (

    <section style={styles.sectionCard}>

      <h1 style={styles.sectionTitle}>
        👤 Patient Profile
      </h1>

      <div style={styles.profileGrid}>

        <div style={styles.profileCard}>
          <FaUserCircle style={styles.bigIcon} />
          <h2>{patientName}</h2>
          <p>Email: {patient.email || "Not available"}</p>
          <p>Phone: {patient.phone || "Not available"}</p>
        </div>

        <div style={styles.profileCard}>
          <FaShieldAlt style={styles.bigIcon} />
          <h2>Safety Conditions</h2>
          <p>Keep emergency contact updated.</p>
          <p>Allow location permission during emergencies.</p>
          <p>Use SOS only for genuine emergency cases.</p>
        </div>

      </div>

    </section>
  );

  const renderSection = () => {

    switch (activeSection) {

      case "overview":
        return renderOverview();

      case "hospitals":
        return renderHospitals();

      case "doctors":
        return renderDoctors();

      case "ambulance":
        return renderAmbulanceBooking();

      case "tracking":
        return renderTracking();

      case "records":
        return renderRecords();

      case "prescription":
        return renderPrescription();

      case "ai":
        return renderAI();

      case "profile":
        return renderProfile();

      default:
        return renderOverview();
    }
  };

  return (

    <div style={styles.mainLayout}>

      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <div style={styles.contentArea}>

        <Navbar />

        {renderSection()}

        {
          showModal && (

            <div style={styles.modalOverlay}>

              <div style={styles.modal}>

                <h1 style={styles.modalTitle}>
                  📅 Book Appointment
                </h1>

                <h2 style={{ color: "white" }}>
                  {selectedDoctor.name}
                </h2>

                <input
                  type="text"
                  name="patientName"
                  placeholder="Enter Patient Name"
                  value={appointmentData.patientName}
                  onChange={handleAppointmentChange}
                  style={styles.input}
                />

                <input
                  type="date"
                  name="appointmentDate"
                  value={appointmentData.appointmentDate}
                  onChange={handleAppointmentChange}
                  style={styles.input}
                />

                <input
                  type="time"
                  name="appointmentTime"
                  value={appointmentData.appointmentTime}
                  onChange={handleAppointmentChange}
                  style={styles.input}
                />

                <div style={styles.modalButtons}>

                  <button
                    style={styles.confirmButton}
                    onClick={confirmAppointment}
                  >
                    Confirm Booking
                  </button>

                  <button
                    style={styles.cancelButton}
                    onClick={() =>
                      setShowModal(false)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

const styles = {

  mainLayout: {
    display: "flex",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
    minHeight: "100vh"
  },

  contentArea: {
    marginLeft: "280px",
    width: "calc(100% - 280px)",
    padding: "30px"
  },

  heroSection: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1.4fr) minmax(320px,0.8fr)",
    alignItems: "center",
    background:
      "linear-gradient(135deg,rgba(37,99,235,0.25),rgba(14,165,233,0.12))",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "30px",
    padding: "42px",
    color: "white",
    gap: "30px",
    boxShadow:
      "0 18px 50px rgba(0,0,0,0.35)"
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background:
      "rgba(34,197,94,0.16)",
    color: "#bbf7d0",
    padding: "10px 16px",
    borderRadius: "30px",
    fontWeight: "800",
    marginBottom: "20px"
  },

  heroContent: {
    maxWidth: "720px"
  },

  heroTitle: {
    fontSize: "56px",
    lineHeight: "1.1",
    marginBottom: "20px"
  },

  heroText: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#cbd5e1"
  },

  heroGraphic: {
    display: "flex",
    justifyContent: "center"
  },

  heroImage: {
    width: "100%",
    maxWidth: "420px",
    borderRadius: "25px",
    boxShadow:
      "0px 8px 35px rgba(0,0,0,0.5)"
  },

  buttonContainer: {
    marginTop: "30px",
    display: "flex",
    gap: "16px",
    flexWrap: "wrap"
  },

  locationButton: {
    padding: "15px 22px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px"
  },

  sosButton: {
    padding: "15px 22px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px"
  },

  warningButton: {
    padding: "15px 22px",
    background:
      "linear-gradient(to right,#ef4444,#dc2626)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px"
  },

  statsContainer: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "22px"
  },

  statCard: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "28px",
    borderRadius: "24px",
    color: "white",
    textAlign: "center",
    border:
      "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0px 4px 25px rgba(0,0,0,0.25)"
  },

  statIcon: {
    fontSize: "42px",
    color: "#38bdf8",
    marginBottom: "12px"
  },

  sectionCard: {
    marginTop: "30px",
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "30px",
    color: "white",
    boxShadow:
      "0 18px 50px rgba(0,0,0,0.30)"
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    marginBottom: "25px",
    flexWrap: "wrap"
  },

  sectionTitle: {
    fontSize: "34px",
    margin: "0 0 8px",
    fontWeight: "900"
  },

  sectionSub: {
    color: "#cbd5e1",
    lineHeight: "1.6"
  },

  emptyBox: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "35px",
    borderRadius: "20px",
    textAlign: "center",
    color: "#e2e8f0"
  },

  map: {
    height: "620px",
    width: "100%",
    borderRadius: "24px",
    overflow: "hidden"
  },

  ambulanceGrid: {
    display: "grid",
    gridTemplateColumns:
      "minmax(300px,1fr) minmax(280px,0.8fr)",
    gap: "24px"
  },

  formCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "26px",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  emergencyInfoCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "26px",
    borderRadius: "22px",
    textAlign: "center",
    lineHeight: "1.7"
  },

  emergencyImage: {
    width: "240px",
    maxWidth: "100%",
    marginBottom: "20px"
  },

  input: {
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    fontSize: "15px",
    outline: "none"
  },

  textarea: {
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    fontSize: "15px",
    outline: "none",
    minHeight: "110px",
    resize: "none"
  },

  trackingGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "22px"
  },

  statusPanel: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "26px",
    borderRadius: "22px",
    textAlign: "center"
  },

  bigIcon: {
    fontSize: "50px",
    color: "#38bdf8",
    marginBottom: "15px"
  },

  primaryAction: {
    marginTop: "16px",
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  mapContainer: {
    marginTop: "30px"
  },

  mapTitle: {
    marginBottom: "18px"
  },

  doctorGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "25px",
    marginTop: "25px"
  },

  doctorCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "26px",
    borderRadius: "25px",
    textAlign: "center",
    position: "relative"
  },

  doctorImage: {
    width: "125px",
    height: "125px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "18px",
    border:
      "5px solid rgba(255,255,255,0.2)"
  },

  onlineBadge: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#16a34a",
    color: "white",
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold"
  },

  doctorButtons: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px"
  },

  callButton: {
    padding: "11px 15px",
    background:
      "linear-gradient(to right,#22c55e,#16a34a)",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  chatButton: {
    padding: "11px 15px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  videoButton: {
    padding: "11px 15px",
    background:
      "linear-gradient(to right,#8b5cf6,#7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },

  bookButton: {
    width: "100%",
    marginTop: "16px",
    padding: "14px",
    background:
      "linear-gradient(to right,#f59e0b,#f97316)",
    border: "none",
    borderRadius: "14px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  uploadCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "28px",
    borderRadius: "22px",
    textAlign: "center"
  },

  fileInput: {
    marginTop: "18px",
    background: "white",
    color: "#0f172a",
    padding: "14px",
    borderRadius: "12px"
  },

  previewContainer: {
    marginTop: "28px",
    textAlign: "center"
  },

  imagePreview: {
    width: "420px",
    maxWidth: "100%",
    borderRadius: "20px",
    marginTop: "18px"
  },

  videoPreview: {
    width: "520px",
    maxWidth: "100%",
    borderRadius: "20px",
    marginTop: "18px"
  },

  prescriptionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "22px",
    marginTop: "25px"
  },

  prescriptionCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "26px",
    borderRadius: "22px",
    textAlign: "center"
  },

  profileGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "22px",
    marginTop: "25px"
  },

  profileCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "26px",
    borderRadius: "22px",
    textAlign: "center",
    lineHeight: "1.8"
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },

  modal: {
    width: "420px",
    background:
      "linear-gradient(to right,#141e30,#243b55)",
    padding: "35px",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  modalTitle: {
    color: "white",
    textAlign: "center"
  },

  modalButtons: {
    display: "flex",
    gap: "14px"
  },

  confirmButton: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#11998e,#38ef7d)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  cancelButton: {
    flex: 1,
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#ff416c,#ff4b2b)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Dashboard;