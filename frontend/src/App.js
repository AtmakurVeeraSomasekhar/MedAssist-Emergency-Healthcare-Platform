import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import PatientRegister from './pages/PatientRegister';

import Login from "./pages/Login";

import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import NearbyHospitals from "./pages/NearbyHospitals";

import AmbulanceBooking from "./pages/AmbulanceBooking";

import AmbulanceStatus from "./pages/AmbulanceStatus";

import LiveDriverTracking from "./pages/LiveDriverTracking";

import RealTimeMap from "./pages/RealTimeMap";

import NearbyEmergencyMap from "./pages/NearbyEmergencyMap";

import AdminDashboard from "./pages/AdminDashboard";

import DriverTracking from "./pages/DriverTracking";

import DriverDashboard from "./pages/DriverDashboard";

import DriverLiveMap from "./pages/DriverLiveMap";

import PatientTracking from "./pages/PatientTracking";

import VerifyOtp from "./pages/VerifyOtp";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import ChatPage from './pages/ChatPage';

import DoctorRegister from "./pages/DoctorRegister";

import DoctorVerificationAdmin from "./pages/DoctorVerificationAdmin";

import DoctorLogin from "./pages/DoctorLogin";

import DoctorDashboard from "./pages/DoctorDashboard";

import VideoConsultation from "./pages/VideoConsultation";

import ConsultationRoom from "./pages/ConsultationRoom";

import DriverRegister from "./pages/DriverRegister";

import DriverLogin from "./pages/DriverLogin";

import DriverVerifyPage from "./pages/DriverVerifyPage";

import AdminLogin from "./pages/AdminLogin";

import HomePage from "./pages/HomePage";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/patient-register"
          element={<PatientRegister />}
        />
        
        <Route
          path="/patient-login"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              tokenKey="token"
              redirectTo="/"
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospitals"
          element={<NearbyHospitals />}
        />

        <Route
          path="/ambulance"
          element={<AmbulanceBooking />}
        />

        <Route
          path="/ambulance-status"
          element={<AmbulanceStatus />}
        />

        <Route
          path="/live-tracking"
          element={<LiveDriverTracking />}
        />

        
        <Route
          path="/real-map"
          element={<RealTimeMap />}
        />

        <Route
          path="/nearby-emergency"
          element={<NearbyEmergencyMap />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              tokenKey="adminToken"
              redirectTo="/"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver-tracking"
          element={<DriverTracking />}
        />

        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute
              tokenKey="driverToken"
              redirectTo="/"
            >
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver-live-map"
          element={<DriverLiveMap />}
        />

        <Route
          path="/patient-tracking"
          element={<PatientTracking />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/chat"
          element={<ChatPage />}
        />

        <Route
          path="/doctor-register"
          element={<DoctorRegister />}
        />

        <Route
          path="/doctor-verification"
          element={<DoctorVerificationAdmin />}
        />

        <Route
          path="/doctor-login"
          element={<DoctorLogin />}
        />

        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute
              tokenKey="doctorToken"
              redirectTo="/"
            >
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/video-consultation"
          element={<VideoConsultation />}
        />

        <Route
          path="/consultation-room"
          element={<ConsultationRoom />}
        />

        <Route
          path="/driver-register"
          element={<DriverRegister />}
        />

        <Route
          path="/driver-login"
          element={<DriverLogin />}
        />

        <Route
          path="/driver-verification"
          element={<DriverVerifyPage />}
        />

        <Route
          path="/"
          element={<HomePage />}
        />
        

      </Routes>

    </BrowserRouter>
  );
}

export default App;