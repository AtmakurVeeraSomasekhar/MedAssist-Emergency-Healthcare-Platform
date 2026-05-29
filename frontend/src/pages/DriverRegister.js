import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaAmbulance,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaIdCard,
  FaHospital,
  FaFileAlt,
  FaCamera,
  FaArrowLeft,
  FaShieldAlt
} from "react-icons/fa";

import {
  registerDriver
} from "../services/driverApi";

function DriverRegister() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      phone: "",
      ambulanceNumber: "",
      vehicleRcNumber: "",
      drivingLicenseNumber: "",
      experience: "",
      serviceProvider: "",
      drivingLicenseUrl: "",
      rcBookUrl: "",
      profilePhotoUrl: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await registerDriver(
          formData
        );

        alert(
          "Driver registration submitted for admin verification"
        );

        navigate(
          "/driver-login"
        );

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div style={styles.page}>

      <div style={styles.container}>

        {/* LEFT INTRO */}

        <div style={styles.leftSection}>

          <button
            style={styles.backButton}
            onClick={() =>
              navigate("/driver-login")
            }
          >
            <FaArrowLeft />
            Back to Login
          </button>

          <div style={styles.logoCircle}>
            🚑
          </div>

          <h1 style={styles.heroTitle}>
            Ambulance Driver
            <br />
            Verification Portal
          </h1>

          <p style={styles.heroText}>
            Register as a verified ambulance driver and become part of a smart
            emergency healthcare network that connects drivers, patients,
            doctors, hospitals, and admins in real time.
          </p>

          <div style={styles.infoGrid}>

            <div style={styles.infoCard}>
              <FaShieldAlt />
              <h3>Admin Verification</h3>
              <p>Your license, RC book, and ambulance details will be reviewed by admin.</p>
            </div>

            <div style={styles.infoCard}>
              <FaAmbulance />
              <h3>Emergency Requests</h3>
              <p>After approval, you can accept patient emergency requests.</p>
            </div>

            <div style={styles.infoCard}>
              <FaHospital />
              <h3>Hospital Support</h3>
              <p>Coordinate patient pickup, route tracking, and hospital assistance.</p>
            </div>

          </div>

          <div style={styles.quoteBox}>
            “Your quick response can save a life.”
          </div>

        </div>

        {/* RIGHT FORM */}

        <form
          style={styles.form}
          onSubmit={handleSubmit}
        >

          <h2 style={styles.title}>
            Driver Registration
          </h2>

          <p style={styles.subtitle}>
            Complete your profile for admin approval.
          </p>

          <div style={styles.row}>

            <InputBox
              icon={<FaUser />}
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <InputBox
              icon={<FaEnvelope />}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div style={styles.row}>

            <InputBox
              icon={<FaLock />}
              name="password"
              type="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
            />

            <InputBox
              icon={<FaPhone />}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

          <div style={styles.row}>

            <InputBox
              icon={<FaAmbulance />}
              name="ambulanceNumber"
              placeholder="Ambulance Number"
              value={formData.ambulanceNumber}
              onChange={handleChange}
            />

            <InputBox
              icon={<FaFileAlt />}
              name="vehicleRcNumber"
              placeholder="Vehicle RC Number"
              value={formData.vehicleRcNumber}
              onChange={handleChange}
            />

          </div>

          <div style={styles.row}>

            <InputBox
              icon={<FaIdCard />}
              name="drivingLicenseNumber"
              placeholder="Driving License Number"
              value={formData.drivingLicenseNumber}
              onChange={handleChange}
            />

            <InputBox
              icon={<FaHospital />}
              name="serviceProvider"
              placeholder="Hospital / Service Provider"
              value={formData.serviceProvider}
              onChange={handleChange}
            />

          </div>

          <InputBox
            icon={<FaFileAlt />}
            name="experience"
            placeholder="Experience in Years"
            value={formData.experience}
            onChange={handleChange}
          />

          <InputBox
            icon={<FaIdCard />}
            name="drivingLicenseUrl"
            placeholder="Driving License Upload URL"
            value={formData.drivingLicenseUrl}
            onChange={handleChange}
          />

          <InputBox
            icon={<FaFileAlt />}
            name="rcBookUrl"
            placeholder="RC Book Upload URL"
            value={formData.rcBookUrl}
            onChange={handleChange}
          />

          <InputBox
            icon={<FaCamera />}
            name="profilePhotoUrl"
            placeholder="Profile Photo URL"
            value={formData.profilePhotoUrl}
            onChange={handleChange}
          />

          <button
            type="submit"
            style={styles.submitButton}
            disabled={loading}
          >
            {
              loading
                ? "Submitting..."
                : "Submit For Admin Verification"
            }
          </button>

          <p style={styles.loginText}>
            Already registered?
            {" "}
            <span
              style={styles.loginLink}
              onClick={() =>
                navigate("/driver-login")
              }
            >
              Login here
            </span>
          </p>

        </form>

      </div>

    </div>
  );
}

function InputBox({
  icon,
  name,
  type = "text",
  placeholder,
  value,
  onChange
}) {

  return (

    <div style={styles.inputGroup}>

      <span style={styles.inputIcon}>
        {icon}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={styles.input}
        required
      />

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#1e3a8a)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },

  container: {
    width: "100%",
    maxWidth: "1250px",
    display: "grid",
    gridTemplateColumns:
      "0.9fr 1.1fr",
    background:
      "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow:
      "0 28px 80px rgba(0,0,0,0.45)"
  },

  leftSection: {
    padding: "55px",
    color: "white",
    background:
      "linear-gradient(180deg,#020617,#0f172a,#1e293b)"
  },

  backButton: {
    padding: "11px 15px",
    border: "none",
    borderRadius: "13px",
    background:
      "rgba(255,255,255,0.12)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginBottom: "35px"
  },

  logoCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "25px",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    marginBottom: "28px"
  },

  heroTitle: {
    fontSize: "46px",
    lineHeight: "1.12",
    marginBottom: "20px"
  },

  heroText: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "17px",
    marginBottom: "28px"
  },

  infoGrid: {
    display: "grid",
    gap: "16px"
  },

  infoCard: {
    background:
      "rgba(255,255,255,0.09)",
    padding: "18px",
    borderRadius: "18px",
    border:
      "1px solid rgba(255,255,255,0.1)"
  },

  quoteBox: {
    marginTop: "25px",
    background:
      "rgba(34,197,94,0.16)",
    color: "#bbf7d0",
    padding: "18px",
    borderRadius: "18px",
    fontWeight: "bold"
  },

  form: {
    background: "white",
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  title: {
    fontSize: "34px",
    margin: 0,
    color: "#0f172a"
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "8px"
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px"
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    border:
      "1px solid #cbd5e1",
    borderRadius: "14px",
    padding: "0 14px",
    background: "#f8fafc"
  },

  inputIcon: {
    color: "#2563eb"
  },

  input: {
    width: "100%",
    padding: "15px 0",
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "15px"
  },

  submitButton: {
    padding: "17px",
    border: "none",
    borderRadius: "15px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px"
  },

  loginText: {
    textAlign: "center",
    color: "#64748b"
  },

  loginLink: {
    color: "#2563eb",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default DriverRegister;