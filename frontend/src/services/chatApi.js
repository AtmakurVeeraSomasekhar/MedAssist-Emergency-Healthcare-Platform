import axios from "axios";

const API =
  "http://localhost:8080";

export const getChatHistory =
  async (roomId) => {

    const response =
      await axios.get(
        `${API}/chat/${roomId}`
      );

    return response.data;
};