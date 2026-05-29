import axios from "axios";

const API =
  "http://localhost:8080/api/prescriptions";

export const createPrescription =
  async (prescriptionData) => {

    const response =
      await axios.post(
        `${API}/create`,
        prescriptionData
      );

    return response.data;
};

export const getPrescriptionsByRoom =
  async (roomId) => {

    const response =
      await axios.get(
        `${API}/room/${roomId}`
      );

    return response.data;
};

export const getPrescriptionsByPatient =
  async (patientId) => {

    const response =
      await axios.get(
        `${API}/patient/${patientId}`
      );

    return response.data;
};