import axios from "axios";

const BASE_URL =
  "http://localhost:8080/api/drivers";

/* =========================
   DRIVER REGISTER
========================= */

export const registerDriver =
  async (driverData) => {

    const response =
      await axios.post(
        `${BASE_URL}/register`,
        driverData
      );

    return response.data;
  };

/* =========================
   DRIVER LOGIN START
   Email + Password
   Backend sends OTP
========================= */

export const loginDriverStart =
  async (loginData) => {

    const response =
      await axios.post(
        `${BASE_URL}/login-start`,
        loginData
      );

    return response.data;
  };

/* =========================
   VERIFY DRIVER LOGIN OTP
   Backend returns JWT
========================= */

export const verifyDriverLoginOtp =
  async (otpData) => {

    const response =
      await axios.post(
        `${BASE_URL}/verify-login-otp`,
        otpData
      );

    return response.data;
  };

/* =========================
   OLD DIRECT LOGIN
   Keep this for backup
========================= */

export const loginDriver =
  async (loginData) => {

    const response =
      await axios.post(
        `${BASE_URL}/login`,
        loginData
      );

    return response.data;
  };

/* =========================
   ADMIN DRIVER VERIFICATION
========================= */

export const getPendingDrivers =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/pending`
      );

    return response.data;
  };

export const approveDriver =
  async (id) => {

    const response =
      await axios.put(
        `${BASE_URL}/approve/${id}`
      );

    return response.data;
  };

export const rejectDriver =
  async (id) => {

    const response =
      await axios.put(
        `${BASE_URL}/reject/${id}`
      );

    return response.data;
  };