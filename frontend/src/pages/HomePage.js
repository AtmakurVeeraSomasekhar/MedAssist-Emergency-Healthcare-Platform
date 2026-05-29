import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaAmbulance,
  FaUserInjured,
  FaUserMd,
  FaUserShield,
  FaHospital,
  FaHeartbeat,
  FaMapMarkedAlt,
  FaShieldAlt,
  //FaPhoneAlt,
  FaComments,
  FaVideo,
  FaRobot,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaClock,
  FaCheckCircle,
  //FaArrowRight,
  FaSignInAlt,
  FaUserPlus,
  FaLock,
  FaEnvelope,
  FaRoute,
  FaDatabase,
  //FaBell,
  FaGlobeAsia,
  //FaStethoscope,
  FaNotesMedical
} from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();

  const [time, setTime] =
    useState(new Date());

  const [activeRole, setActiveRole] =
    useState("patient");

  const [showTerms, setShowTerms] =
    useState(false);

  useEffect(() => {
    const timer =
      setInterval(() => {
        setTime(new Date());
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  const roles = [
    {
      id: "patient",
      title: "Patient Portal",
      icon: <FaUserInjured />,
      gradient:
        "linear-gradient(135deg,#ef4444,#f97316)",
      login: "/login",
      register: "/signup",
      
      description:
        "Patients can request ambulance support, find nearby hospitals, consult doctors, upload medical records, use AI emergency assistance and track live ambulance status.",
      points: [
        "Emergency SOS and ambulance booking",
        "Nearby hospitals with map location",
        "Doctor chat, call and video consultation",
        "Medical records and prescription center",
        "AI emergency guidance before help arrives"
      ]
    },
    {
      id: "doctor",
      title: "Doctor Portal",
      icon: <FaUserMd />,
      gradient:
        "linear-gradient(135deg,#2563eb,#06b6d4)",
      login: "/doctor-login",
      register: "/doctor-register",
      dashboard: "/doctor-dashboard",
      description:
        "Doctors can manage emergency patient cases, verify patient symptoms, support chat consultation, video guidance, prescription updates and digital healthcare communication.",
      points: [
        "Doctor profile and verification",
        "Patient case review",
        "Chat and consultation support",
        "Prescription and medical advice",
        "Emergency care communication"
      ]
    },
    {
      id: "driver",
      title: "Ambulance Driver Portal",
      icon: <FaAmbulance />,
      gradient:
        "linear-gradient(135deg,#16a34a,#22c55e)",
      login: "/driver-login",
      register: "/driver-register",
      dashboard: "/driver-dashboard",
      description:
        "Drivers receive emergency requests, view patient location, accept cases, update status, communicate with patients and support live ambulance tracking.",
      points: [
        "Admin-approved driver access",
        "Emergency request acceptance",
        "Live patient location and route support",
        "Driver-patient communication",
        "Ambulance status updates"
      ]
    },
    {
      id: "admin",
      title: "Admin Control Center",
      icon: <FaUserShield />,
      gradient:
        "linear-gradient(135deg,#7c3aed,#a855f7)",
      login: "/admin-login",
      register: "/admin-login",
      dashboard: "/admin-dashboard",
      description:
        "Admins manage the complete healthcare ecosystem, verify doctors and drivers, monitor emergencies, track ambulance requests and maintain platform security.",
      points: [
        "Doctor verification",
        "Driver verification",
        "Emergency analytics dashboard",
        "Patient and ambulance monitoring",
        "Role-based access control"
      ]
    }
  ];

  const selectedRole =
    roles.find(
      (role) => role.id === activeRole
    ) || roles[0];

  const workflows = [
    {
      icon: <FaUserPlus />,
      title: "Register",
      text:
        "New users register with required details. Doctor and driver accounts go for admin verification."
    },
    {
      icon: <FaEnvelope />,
      title: "OTP Verification",
      text:
        "Users verify identity through secure Gmail OTP before entering protected dashboards."
    },
    {
      icon: <FaLock />,
      title: "Secure Login",
      text:
        "Password is encrypted in backend and JWT token is generated after successful authentication."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Live Emergency Action",
      text:
        "Patients, drivers, doctors and admins work together through maps, chat, tracking and emergency status."
    }
  ];

  const features = [
    {
      icon: <FaAmbulance />,
      title: "Auto Ambulance Dispatch",
      text:
        "Patient emergency request is created and nearby drivers can accept and update live status."
    },
    {
      icon: <FaHospital />,
      title: "Nearby Hospital Map",
      text:
        "OpenStreetMap integration helps patients find nearby hospitals and emergency centers."
    },
    {
      icon: <FaRoute />,
      title: "Live Route Tracking",
      text:
        "Patient can view ambulance movement, distance and estimated arrival from the tracking portal."
    },
    {
      icon: <FaComments />,
      title: "Chat Communication",
      text:
        "Patients, doctors and drivers can communicate instantly during emergency situations."
    },
    {
      icon: <FaVideo />,
      title: "Video Consultation",
      text:
        "Doctor video consultation module can support urgent telemedicine assistance."
    },
    {
      icon: <FaRobot />,
      title: "AI Emergency Assistant",
      text:
        "AI guidance helps patients understand immediate precautions before professional help arrives."
    },
    {
      icon: <FaFileMedical />,
      title: "Medical Records",
      text:
        "Patients can upload reports, emergency images, videos and health documents."
    },
    {
      icon: <FaPrescriptionBottleAlt />,
      title: "Prescription Center",
      text:
        "Doctors can later provide digital prescriptions and medical notes to patients."
    },
    {
      icon: <FaDatabase />,
      title: "MongoDB Storage",
      text:
        "Patient, doctor, driver, OTP, ambulance and admin data are stored professionally in database."
    }
  ];

  const safetyRules = [
    "Use Emergency SOS only for genuine emergency conditions.",
    "Allow browser location permission during ambulance booking.",
    "Keep phone number and emergency contact updated.",
    "Drivers must follow traffic safety rules during emergency response.",
    "Doctors and drivers must be verified by admin before active use.",
    "Uploaded medical files must be valid and related to patient care.",
    "Admin can approve, reject or monitor users based on platform rules.",
    "The platform supports emergency coordination but does not replace hospital treatment."
  ];

  return (

    <div style={styles.page}>

      {/* NAVBAR */}

      <nav style={styles.navbar}>

        <div style={styles.brandBox}>

          <div style={styles.brandIcon}>
            🚑
          </div>

          <div>
            <h2 style={styles.brandName}>
              MedResQ Nexus
            </h2>

            <p style={styles.brandSub}>
              Smart Emergency Healthcare Network
            </p>
          </div>

        </div>

        <div style={styles.navCenter}>

          <a href="#modules" style={styles.navLink}>
            Modules
          </a>

          <a href="#workflow" style={styles.navLink}>
            Workflow
          </a>

          <a href="#features" style={styles.navLink}>
            Features
          </a>

          <a href="#rules" style={styles.navLink}>
            Safety
          </a>

        </div>

        <div style={styles.timeBox}>

          <FaClock />

          <span>
            {time.toLocaleTimeString()}
          </span>

        </div>

      </nav>

      {/* HERO */}

      <section style={styles.hero}>

        <div style={styles.heroLeft}>

          <span style={styles.heroBadge}>
            <FaShieldAlt />
            Trusted Emergency Care Access Portal
          </span>

          <h1 style={styles.heroTitle}>
            One Platform For
            <br />
            Emergency Healthcare,
            <br />
            Doctors & Ambulance Support
          </h1>

          <p style={styles.heroText}>
            MedResQ Nexus connects patients, doctors, ambulance drivers and admins
            into one real-time emergency healthcare ecosystem with secure login,
            OTP verification, live tracking, hospital maps, chat, video consultation
            and AI emergency assistance.
          </p>

          <div style={styles.quoteBox}>
            “Health is the real wealth. Every second matters when a life is waiting for help.”
          </div>

          <div style={styles.heroButtons}>

            <button
              style={styles.primaryButton}
              onClick={() =>
                navigate("/login")
              }
            >
              <FaUserInjured />
              Patient Login
            </button>

            <button
              style={styles.secondaryButton}
              onClick={() =>
                navigate("/driver-login")
              }
            >
              <FaAmbulance />
              Driver Login
            </button>

            <button
              style={styles.outlineButton}
              onClick={() =>
                setShowTerms(true)
              }
            >
              <FaNotesMedical />
              View Rules
            </button>

          </div>

        </div>

        <div style={styles.heroRight}>

          <div style={styles.heroCard}>

            <img
              src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1513.jpg"
              alt="Healthcare platform"
              style={styles.heroImage}
            />

            <div style={styles.liveCard}>
              <span style={styles.liveDot}>
                ●
              </span>
              Live Emergency Network Active
            </div>

          </div>

          <div style={styles.floatingCardOne}>
            <FaAmbulance />
            <span>Ambulance Tracking</span>
          </div>

          <div style={styles.floatingCardTwo}>
            <FaUserMd />
            <span>Doctor Online</span>
          </div>

        </div>

      </section>

      {/* TRUST STATS */}

      <section style={styles.trustStats}>

        <div style={styles.trustCard}>
          <FaHeartbeat style={styles.trustIcon} />
          <h2>24/7</h2>
          <p>Emergency Support Design</p>
        </div>

        <div style={styles.trustCard}>
          <FaGlobeAsia style={styles.trustIcon} />
          <h2>Live</h2>
          <p>Map-Based Healthcare Access</p>
        </div>

        <div style={styles.trustCard}>
          <FaShieldAlt style={styles.trustIcon} />
          <h2>Secure</h2>
          <p>OTP + JWT Login Flow</p>
        </div>

        <div style={styles.trustCard}>
          <FaDatabase style={styles.trustIcon} />
          <h2>MongoDB</h2>
          <p>Professional Data Storage</p>
        </div>

      </section>

      {/* MODULE SELECTOR */}

      <section
        id="modules"
        style={styles.section}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionBadge}>
            Access Modules
          </span>

          <h1 style={styles.sectionTitle}>
            Choose Your Healthcare Role
          </h1>

          <p style={styles.sectionText}>
            Every user has a separate secured flow, dashboard, responsibilities and permissions.
          </p>

        </div>

        <div style={styles.moduleGrid}>

          {
            roles.map((role) => (

              <button
                key={role.id}
                style={
                  activeRole === role.id
                    ? {
                        ...styles.moduleCard,
                        border:
                          "1px solid #38bdf8",
                        transform:
                          "translateY(-6px)"
                      }
                    : styles.moduleCard
                }
                onClick={() =>
                  setActiveRole(role.id)
                }
              >

                <div
                  style={{
                    ...styles.moduleIcon,
                    background:
                      role.gradient
                  }}
                >
                  {role.icon}
                </div>

                <h2>{role.title}</h2>

                <p>
                  {role.description}
                </p>

              </button>

            ))
          }

        </div>

        <div style={styles.roleDetails}>

          <div style={styles.roleDetailsLeft}>

            <div
              style={{
                ...styles.roleBigIcon,
                background:
                  selectedRole.gradient
              }}
            >
              {selectedRole.icon}
            </div>

            <h1>
              {selectedRole.title}
            </h1>

            <p>
              {selectedRole.description}
            </p>

            <div style={styles.roleButtons}>

              <button
                style={styles.primaryButton}
                onClick={() =>
                  navigate(selectedRole.login)
                }
              >
                <FaSignInAlt />
                Login
              </button>

              <button
                style={styles.secondaryButton}
                onClick={() =>
                  navigate(selectedRole.register)
                }
              >
                <FaUserPlus />
                New User Register
              </button>

              

            </div>

          </div>

          <div style={styles.roleDetailsRight}>

            <h2>
              What can this user perform?
            </h2>

            {
              selectedRole.points.map(
                (point, index) => (

                  <div
                    key={index}
                    style={styles.pointItem}
                  >
                    <FaCheckCircle />
                    <span>{point}</span>
                  </div>

                )
              )
            }

          </div>

        </div>

      </section>

      {/* WORKFLOW */}

      <section
        id="workflow"
        style={styles.section}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionBadge}>
            Login System Flow
          </span>

          <h1 style={styles.sectionTitle}>
            From Registration To Dashboard
          </h1>

          <p style={styles.sectionText}>
            This is the professional authentication journey for every role in the platform.
          </p>

        </div>

        <div style={styles.workflowGrid}>

          {
            workflows.map((item, index) => (

              <div
                key={index}
                style={styles.workflowCard}
              >

                <div style={styles.workflowNumber}>
                  {index + 1}
                </div>

                <div style={styles.workflowIcon}>
                  {item.icon}
                </div>

                <h2>
                  {item.title}
                </h2>

                <p>
                  {item.text}
                </p>

              </div>

            ))
          }

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        style={styles.section}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionBadge}>
            Platform Features
          </span>

          <h1 style={styles.sectionTitle}>
            Complete Emergency Healthcare Ecosystem
          </h1>

          <p style={styles.sectionText}>
            Designed like a real startup-grade emergency response and telemedicine system.
          </p>

        </div>

        <div style={styles.featuresGrid}>

          {
            features.map((feature, index) => (

              <div
                key={index}
                style={styles.featureCard}
              >

                <div style={styles.featureIcon}>
                  {feature.icon}
                </div>

                <h2>
                  {feature.title}
                </h2>

                <p>
                  {feature.text}
                </p>

              </div>

            ))
          }

        </div>

      </section>

      {/* FUNCTIONAL FLOW */}

      <section style={styles.flowSection}>

        <div style={styles.flowLeft}>

          <span style={styles.sectionBadge}>
            Real Emergency Story
          </span>

          <h1 style={styles.sectionTitle}>
            How The System Works In A Real Emergency
          </h1>

          <p style={styles.sectionText}>
            A patient opens the portal, logs in securely, books an ambulance,
            nearby driver accepts, doctor supports through chat/video, and admin monitors
            the whole emergency system.
          </p>

          <div style={styles.flowList}>

            <div style={styles.flowItem}>
              <FaUserInjured />
              Patient sends SOS and ambulance request
            </div>

            <div style={styles.flowItem}>
              <FaAmbulance />
              Driver accepts request and starts live tracking
            </div>

            <div style={styles.flowItem}>
              <FaMapMarkedAlt />
              Patient views ambulance route and estimated arrival
            </div>

            <div style={styles.flowItem}>
              <FaUserMd />
              Doctor supports patient through consultation
            </div>

            <div style={styles.flowItem}>
              <FaUserShield />
              Admin monitors doctors, drivers and emergencies
            </div>

          </div>

        </div>

        <div style={styles.flowImageCard}>

          <img
            src="https://img.freepik.com/free-vector/ambulance-concept-illustration_114360-9148.jpg"
            alt="Ambulance emergency"
            style={styles.flowImage}
          />

        </div>

      </section>

      {/* RULES */}

      <section
        id="rules"
        style={styles.section}
      >

        <div style={styles.sectionHeader}>

          <span style={styles.sectionBadge}>
            Rules & Safety Conditions
          </span>

          <h1 style={styles.sectionTitle}>
            Responsible Healthcare Usage
          </h1>

          <p style={styles.sectionText}>
            These rules help keep the system safe, trustworthy and useful during emergencies.
          </p>

        </div>

        <div style={styles.rulesGrid}>

          {
            safetyRules.map((rule, index) => (

              <div
                key={index}
                style={styles.ruleCard}
              >
                <FaCheckCircle />
                <p>{rule}</p>
              </div>

            ))
          }

        </div>

      </section>

      {/* FINAL CTA */}

      <section style={styles.finalCta}>

        <h1>
          Start Your Emergency Healthcare Journey
        </h1>

        <p>
          Choose your role and enter the correct secure dashboard.
        </p>

        <div style={styles.finalButtons}>

          <button
            style={styles.primaryButton}
            onClick={() =>
              navigate("/login")
            }
          >
            Patient Login
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() =>
              navigate("/doctor-login")
            }
          >
            Doctor Login
          </button>

          <button
            style={styles.greenButton}
            onClick={() =>
              navigate("/driver-login")
            }
          >
            Driver Login
          </button>

          <button
            style={styles.purpleButton}
            onClick={() =>
              navigate("/admin-login")
            }
          >
            Admin Login
          </button>

        </div>

      </section>

      {/* TERMS MODAL */}

      {
        showTerms && (

          <div style={styles.modalOverlay}>

            <div style={styles.modal}>

              <h1>
                MedResQ Nexus Terms & Conditions
              </h1>

              <p>
                This platform is designed for emergency coordination, hospital access,
                doctor communication, ambulance tracking and patient support.
                It should be used responsibly and only for genuine healthcare needs.
              </p>

              <div style={styles.modalRules}>

                {
                  safetyRules.map((rule, index) => (

                    <div
                      key={index}
                      style={styles.modalRule}
                    >
                      <FaCheckCircle />
                      {rule}
                    </div>

                  ))
                }

              </div>

              <button
                style={styles.primaryButton}
                onClick={() =>
                  setShowTerms(false)
                }
              >
                I Understand
              </button>

            </div>

          </div>
        )
      }

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "white",
    overflowX: "hidden"
  },

  navbar: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "18px 50px",
    background:
      "rgba(2,6,23,0.88)",
    backdropFilter: "blur(20px)",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)"
  },

  brandBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },

  brandIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    background:
      "linear-gradient(135deg,#ef4444,#f97316)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    boxShadow:
      "0 10px 30px rgba(239,68,68,0.35)"
  },

  brandName: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "900"
  },

  brandSub: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "12px"
  },

  navCenter: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    flexWrap: "wrap"
  },

  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px"
  },

  timeBox: {
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    padding: "11px 15px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#e0f2fe",
    fontWeight: "800"
  },

  hero: {
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1.2fr) minmax(350px,0.8fr)",
    alignItems: "center",
    gap: "40px",
    padding: "70px 60px 50px"
  },

  heroLeft: {
    maxWidth: "850px"
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background:
      "rgba(34,197,94,0.15)",
    color: "#bbf7d0",
    padding: "10px 16px",
    borderRadius: "30px",
    fontWeight: "800",
    marginBottom: "24px",
    border:
      "1px solid rgba(34,197,94,0.25)"
  },

  heroTitle: {
    fontSize: "64px",
    lineHeight: "1.05",
    margin: "0 0 24px",
    fontWeight: "950"
  },

  heroText: {
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: "1.9",
    maxWidth: "780px"
  },

  quoteBox: {
    marginTop: "24px",
    background:
      "linear-gradient(135deg,rgba(14,165,233,0.16),rgba(34,197,94,0.12))",
    border:
      "1px solid rgba(255,255,255,0.08)",
    padding: "18px 22px",
    borderRadius: "20px",
    color: "#e0f2fe",
    fontWeight: "800",
    maxWidth: "680px"
  },

  heroButtons: {
    marginTop: "30px",
    display: "flex",
    gap: "16px",
    flexWrap: "wrap"
  },

  primaryButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    boxShadow:
      "0 10px 25px rgba(37,99,235,0.35)"
  },

  secondaryButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#ef4444,#f97316)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    boxShadow:
      "0 10px 25px rgba(239,68,68,0.32)"
  },

  greenButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#16a34a,#22c55e)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer"
  },

  purpleButton: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "14px",
    background:
      "linear-gradient(to right,#7c3aed,#a855f7)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer"
  },

  outlineButton: {
    padding: "14px 20px",
    border:
      "1px solid rgba(255,255,255,0.16)",
    borderRadius: "14px",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    fontWeight: "900",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px"
  },

  heroRight: {
    position: "relative"
  },

  heroCard: {
    background:
      "rgba(255,255,255,0.09)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "32px",
    padding: "24px",
    boxShadow:
      "0 24px 70px rgba(0,0,0,0.45)",
    position: "relative"
  },

  heroImage: {
    width: "100%",
    borderRadius: "24px",
    display: "block"
  },

  liveCard: {
    position: "absolute",
    bottom: "35px",
    left: "35px",
    right: "35px",
    background:
      "rgba(2,6,23,0.88)",
    backdropFilter: "blur(18px)",
    padding: "14px 18px",
    borderRadius: "18px",
    fontWeight: "900",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  liveDot: {
    color: "#22c55e"
  },

  floatingCardOne: {
    position: "absolute",
    top: "30px",
    left: "-35px",
    background:
      "linear-gradient(to right,#ef4444,#f97316)",
    padding: "14px 18px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "900",
    boxShadow:
      "0 12px 35px rgba(239,68,68,0.35)"
  },

  floatingCardTwo: {
    position: "absolute",
    bottom: "45px",
    right: "-35px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    padding: "14px 18px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "900",
    boxShadow:
      "0 12px 35px rgba(37,99,235,0.35)"
  },

  trustStats: {
    padding: "20px 60px 40px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px"
  },

  trustCard: {
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "24px",
    textAlign: "center",
    boxShadow:
      "0 12px 32px rgba(0,0,0,0.25)"
  },

  trustIcon: {
    fontSize: "38px",
    color: "#38bdf8",
    marginBottom: "12px"
  },

  section: {
    padding: "55px 60px"
  },

  sectionHeader: {
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto 35px"
  },

  sectionBadge: {
    display: "inline-block",
    padding: "9px 14px",
    borderRadius: "30px",
    background:
      "rgba(14,165,233,0.14)",
    color: "#7dd3fc",
    fontWeight: "900",
    marginBottom: "14px"
  },

  sectionTitle: {
    fontSize: "44px",
    lineHeight: "1.15",
    margin: "0 0 14px",
    fontWeight: "950"
  },

  sectionText: {
    color: "#cbd5e1",
    fontSize: "17px",
    lineHeight: "1.8"
  },

  moduleGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "22px"
  },

  moduleCard: {
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "26px",
    padding: "26px",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
    transition: "0.3s",
    boxShadow:
      "0 14px 38px rgba(0,0,0,0.25)"
  },

  moduleIcon: {
    width: "68px",
    height: "68px",
    borderRadius: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    marginBottom: "18px"
  },

  roleDetails: {
    marginTop: "30px",
    background:
      "linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.06))",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "30px",
    padding: "32px",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1fr) minmax(320px,0.8fr)",
    gap: "30px"
  },

  roleBigIcon: {
    width: "90px",
    height: "90px",
    borderRadius: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
    marginBottom: "18px"
  },

  roleButtons: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "24px"
  },

  roleDetailsRight: {
    background:
      "rgba(2,6,23,0.4)",
    padding: "24px",
    borderRadius: "24px"
  },

  pointItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 0",
    color: "#e2e8f0",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)"
  },

  workflowGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "22px"
  },

  workflowCard: {
    position: "relative",
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "26px",
    padding: "28px",
    boxShadow:
      "0 14px 38px rgba(0,0,0,0.25)"
  },

  workflowNumber: {
    position: "absolute",
    top: "18px",
    right: "18px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900"
  },

  workflowIcon: {
    fontSize: "38px",
    color: "#38bdf8",
    marginBottom: "18px"
  },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "22px"
  },

  featureCard: {
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "26px",
    padding: "26px",
    boxShadow:
      "0 14px 38px rgba(0,0,0,0.25)"
  },

  featureIcon: {
    fontSize: "36px",
    color: "#38bdf8",
    marginBottom: "16px"
  },

  flowSection: {
    margin: "40px 60px",
    padding: "42px",
    borderRadius: "34px",
    background:
      "linear-gradient(135deg,rgba(37,99,235,0.22),rgba(34,197,94,0.12))",
    border:
      "1px solid rgba(255,255,255,0.1)",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,1.2fr) minmax(300px,0.8fr)",
    gap: "35px",
    alignItems: "center"
  },

  flowList: {
    display: "grid",
    gap: "14px",
    marginTop: "26px"
  },

  flowItem: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "16px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    gap: "13px",
    color: "#e2e8f0",
    fontWeight: "800"
  },

  flowImageCard: {
    background:
      "rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "22px"
  },

  flowImage: {
    width: "100%",
    borderRadius: "22px"
  },

  rulesGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "18px"
  },

  ruleCard: {
    background:
      "rgba(255,255,255,0.08)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    gap: "13px",
    alignItems: "flex-start",
    color: "#e2e8f0",
    lineHeight: "1.6"
  },

  finalCta: {
    margin: "45px 60px 70px",
    padding: "45px",
    borderRadius: "34px",
    background:
      "linear-gradient(135deg,#2563eb,#06b6d4)",
    textAlign: "center",
    boxShadow:
      "0 18px 60px rgba(37,99,235,0.35)"
  },

  finalButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginTop: "26px"
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background:
      "rgba(0,0,0,0.78)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "25px"
  },

  modal: {
    width: "100%",
    maxWidth: "760px",
    maxHeight: "85vh",
    overflowY: "auto",
    background:
      "linear-gradient(135deg,#0f172a,#1e293b)",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "28px",
    padding: "32px",
    color: "white",
    boxShadow:
      "0 28px 80px rgba(0,0,0,0.5)"
  },

  modalRules: {
    display: "grid",
    gap: "12px",
    margin: "24px 0"
  },

  modalRule: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "14px",
    borderRadius: "14px",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    lineHeight: "1.6"
  }
};

export default HomePage;