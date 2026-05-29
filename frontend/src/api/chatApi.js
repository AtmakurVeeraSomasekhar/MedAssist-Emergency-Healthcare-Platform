import axios from "axios";

const CHAT_API =
  "http://localhost:8080/chat";

/* =========================
   GET CHAT HISTORY
========================= */

export const getChatHistory =
  async (roomId) => {

    const response =
      await axios.get(
        `${CHAT_API}/${roomId}`
      );

    return response.data;
};

/* =========================
   SAVE MESSAGE
========================= */

export const saveMessage =
  async (messageData) => {

    const response =
      await axios.post(
        `${CHAT_API}/save`,
        messageData
      );

    return response.data;
};