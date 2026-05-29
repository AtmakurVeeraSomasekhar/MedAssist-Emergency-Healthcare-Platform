import axios from "axios";

const API =
  "http://localhost:8080/api/emergency-requests";

export const createEmergencyRequest =
  async (requestData) => {

    const response =
      await axios.post(
        `${API}/create`,
        requestData
      );

    return response.data;
  };

export const getPendingEmergencyRequests =
  async () => {

    const response =
      await axios.get(
        `${API}/pending`
      );

    return response.data;
  };

export const acceptEmergencyCase =
  async (requestId, doctorId) => {

    const response =
      await axios.put(
        `${API}/accept/${requestId}/${doctorId}`
      );

    return response.data;
  };

export const getDoctorActiveCases =
  async (doctorId) => {

    const response =
      await axios.get(
        `${API}/active/${doctorId}`
      );

    return response.data;
  };