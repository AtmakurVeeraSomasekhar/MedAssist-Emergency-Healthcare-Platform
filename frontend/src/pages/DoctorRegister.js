import React, { useState } from "react";

import {
  registerDoctor,
  sendDoctorOtp,
  verifyDoctorOtp
} from "../services/doctorApi";

function DoctorRegister() {
  const [step, setStep] = useState(1);

  const [otpVerified, setOtpVerified] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    otp: "",
    specialization: "",
    experience: "",
    hospital: "",
    licenseNumber: "",
    mbbsCertificateUrl: "",
    mdCertificateUrl: "",
    aadhaarUrl: "",
    profilePhotoUrl: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSendOtp = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please enter name, email and password first");
      return;
    }

    try {
      setLoading(true);

      await sendDoctorOtp(formData.email);

      alert("OTP sent to your email");

      nextStep();

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "OTP sending failed. Check backend Gmail App Password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) {
      alert("Please enter OTP");
      return;
    }

    try {
      setLoading(true);

      await verifyDoctorOtp(
        formData.email,
        formData.otp
      );

      setOtpVerified(true);

      alert("OTP verified successfully");

      nextStep();

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Invalid OTP or OTP expired"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify email OTP first");
      return;
    }

    try {
      setLoading(true);

      const finalData = {
        ...formData,
        verificationStatus: "PENDING"
      };

      await registerDoctor(finalData);

      setStep(6);

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Doctor registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.left}>
          <h1 style={styles.brand}>MedCare Doctor Portal</h1>
          <p style={styles.leftText}>
            Secure doctor onboarding with email verification, license review,
            and admin approval.
          </p>

          <div style={styles.progressBox}>
            <p>Step {step > 5 ? 5 : step} of 5</p>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${((step > 5 ? 5 : step) / 5) * 100}%`
                }}
              />
            </div>
          </div>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>

          {step === 1 && (
            <>
              <h2 style={styles.title}>Basic Details</h2>
              <p style={styles.subtitle}>
                Enter your name, email and password to start verification.
              </p>

              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                name="password"
                type="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <button
                type="button"
                style={styles.button}
                onClick={handleSendOtp}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP & Continue"}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={styles.title}>Email OTP Verification</h2>
              <p style={styles.subtitle}>
                Enter the OTP sent to your registered email.
              </p>

              <input
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <div style={styles.row}>
                <button
                  type="button"
                  style={styles.backButton}
                  onClick={prevStep}
                  disabled={loading}
                >
                  Back
                </button>

                <button
                  type="button"
                  style={styles.button}
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={styles.title}>Professional Details</h2>
              <p style={styles.subtitle}>
                Tell us about your specialization and experience.
              </p>

              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                style={styles.input}
                required
              >
                <option value="">Select Specialization</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Emergency Specialist">Emergency Specialist</option>
                <option value="General Physician">General Physician</option>
                <option value="Orthopedic">Orthopedic</option>
              </select>

              <input
                name="experience"
                placeholder="Experience in Years"
                value={formData.experience}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                name="hospital"
                placeholder="Current / Previous Hospital"
                value={formData.hospital}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <div style={styles.row}>
                <button type="button" style={styles.backButton} onClick={prevStep}>
                  Back
                </button>

                <button type="button" style={styles.button} onClick={nextStep}>
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 style={styles.title}>Medical Verification</h2>
              <p style={styles.subtitle}>
                Upload documents required for admin verification.
              </p>

              <input
                name="licenseNumber"
                placeholder="Medical License Number"
                value={formData.licenseNumber}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                name="mbbsCertificateUrl"
                placeholder="MBBS Certificate URL"
                value={formData.mbbsCertificateUrl}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <input
                name="mdCertificateUrl"
                placeholder="MD Certificate URL"
                value={formData.mdCertificateUrl}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                name="aadhaarUrl"
                placeholder="Aadhaar Document URL"
                value={formData.aadhaarUrl}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <div style={styles.row}>
                <button type="button" style={styles.backButton} onClick={prevStep}>
                  Back
                </button>

                <button type="button" style={styles.button} onClick={nextStep}>
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h2 style={styles.title}>Profile Photo</h2>
              <p style={styles.subtitle}>
                Add your professional profile photo URL.
              </p>

              <input
                name="profilePhotoUrl"
                placeholder="Profile Photo URL"
                value={formData.profilePhotoUrl}
                onChange={handleChange}
                style={styles.input}
                required
              />

              <div style={styles.summary}>
                <h3>Verification Summary</h3>
                <p><b>Name:</b> {formData.fullName}</p>
                <p><b>Email:</b> {formData.email}</p>
                <p><b>OTP:</b> {otpVerified ? "Verified" : "Not Verified"}</p>
                <p><b>Specialization:</b> {formData.specialization}</p>
                <p><b>Hospital:</b> {formData.hospital}</p>
                <p><b>Status:</b> PENDING ADMIN APPROVAL</p>
              </div>

              <div style={styles.row}>
                <button type="button" style={styles.backButton} onClick={prevStep}>
                  Back
                </button>

                <button
                  type="submit"
                  style={styles.button}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit For Verification"}
                </button>
              </div>
            </>
          )}

          {step === 6 && (
            <div style={styles.successBox}>
              <h1>✅ Submitted Successfully</h1>
              <p>Your doctor profile is under admin verification.</p>
              <p>After approval, you can login and access the Doctor Dashboard.</p>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#020617,#1e3a8a,#2563eb)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px"
  },
  card: {
    width: "100%",
    maxWidth: "1200px",
    minHeight: "720px",
    display: "flex",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 25px 80px rgba(0,0,0,0.45)",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)"
  },
  left: {
    flex: 1,
    padding: "60px",
    color: "white",
    background: "linear-gradient(160deg,rgba(15,23,42,0.95),rgba(37,99,235,0.6))"
  },
  brand: {
    fontSize: "44px",
    fontWeight: "800",
    marginBottom: "20px"
  },
  leftText: {
    fontSize: "18px",
    lineHeight: "1.8",
    opacity: 0.9
  },
  progressBox: {
    marginTop: "80px"
  },
  progressTrack: {
    height: "12px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "20px",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(to right,#22c55e,#06b6d4)",
    transition: "0.4s"
  },
  form: {
    flex: 1,
    background: "white",
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontSize: "34px",
    color: "#0f172a",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#64748b",
    marginBottom: "30px",
    fontSize: "16px"
  },
  input: {
    padding: "16px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    marginBottom: "18px",
    fontSize: "16px",
    outline: "none"
  },
  row: {
    display: "flex",
    gap: "15px"
  },
  button: {
    flex: 1,
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  backButton: {
    flex: 1,
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: "#e2e8f0",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  summary: {
    background: "#f8fafc",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "20px",
    border: "1px solid #e2e8f0"
  },
  successBox: {
    textAlign: "center",
    color: "#0f172a",
    background: "#ecfdf5",
    padding: "40px",
    borderRadius: "24px"
  }
};

export default DoctorRegister;