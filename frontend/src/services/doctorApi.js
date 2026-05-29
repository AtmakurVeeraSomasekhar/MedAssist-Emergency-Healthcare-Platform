import axios from "axios";

const API = "http://localhost:8080/api/doctors";

export const registerDoctor = async (doctorData) => {
  const response = await axios.post(
    `${API}/register`,
    doctorData
  );

  return response.data;
};

export const loginDoctor = async (loginData) => {
  const response = await axios.post(
    `${API}/login`,
    loginData
  );

  return response.data;
};

export const getPendingDoctors = async () => {
  const response = await axios.get(
    `${API}/pending`
  );

  return response.data;
};

export const approveDoctor = async (id) => {
  const response = await axios.put(
    `${API}/approve/${id}`
  );

  return response.data;
};

export const rejectDoctor = async (id) => {
  const response = await axios.put(
    `${API}/reject/${id}`
  );

  return response.data;
};

export const updateDoctorStatus =
  async (doctorId, onlineStatus) => {

    const response =
      await axios.put(
        `${API}/status/${doctorId}`,
        {
          onlineStatus
        }
      );

    return response.data;
};

export const sendDoctorOtp = async (email) => {
  const response = await axios.post(
    `${API}/send-otp`,
    { email }
  );

  return response.data;
};

export const verifyDoctorOtp = async (email, otp) => {
  const response = await axios.post(
    `${API}/verify-otp`,
    { email, otp }
  );

  return response.data;
};