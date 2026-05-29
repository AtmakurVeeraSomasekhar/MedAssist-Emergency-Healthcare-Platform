import axios from "axios";

const BASE_URL =
  "http://localhost:8080/api";

/* =========================
   PATIENT REGISTER API
========================= */

export const savePatient =
  async (patientData) => {

    const response =
      await axios.post(
        `${BASE_URL}/patients/register`,
        patientData
      );

    return response.data;
  };

/* =========================
   GET ALL PATIENTS
========================= */

export const getPatients =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/patients`
      );

    return response.data;
  };

/* =========================
   LOGIN API
========================= */

export const loginPatient =
  async (loginData) => {

    const response =
      await axios.post(
        `${BASE_URL}/login`,
        loginData
      );

    return response.data;
  };

/* =========================
   CREATE AMBULANCE REQUEST
========================= */

export const requestAmbulance =
  async (requestData) => {

    const response =
      await axios.post(
        `${BASE_URL}/ambulance`,
        requestData
      );

    return response.data;
  };

/* =========================
   GET ALL AMBULANCE REQUESTS
========================= */

export const getAmbulanceRequests =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/ambulance`
      );

    return response.data;
  };

/* =========================
   UPDATE AMBULANCE STATUS
========================= */

export const updateAmbulanceStatus =
  async (id, status) => {

    const response =
      await axios.put(
        `${BASE_URL}/ambulance/status/${id}`,
        {
          status: status
        }
      );

    return response.data;
  };