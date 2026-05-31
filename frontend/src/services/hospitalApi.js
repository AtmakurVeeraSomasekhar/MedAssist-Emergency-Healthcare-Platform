import axios from "axios";

const BASE_URL =
"http://localhost:8080/api/hospitals";

export const getHospitals =
async () => {

  const response =
    await axios.get(BASE_URL);

  return response.data;
};