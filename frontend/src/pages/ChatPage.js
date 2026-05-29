import React from "react";

import ChatRoom
from "../components/ChatRoom";

function ChatPage() {

  return (

    <div style={styles.page}>

      <h1 style={styles.title}>
        💬 Private Doctor Consultation
      </h1>

      <ChatRoom />

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(to right,#0f172a,#1e293b)"
  },

  title: {
    color: "white",
    textAlign: "center",
    marginBottom: "30px"
  }
};

export default ChatPage;