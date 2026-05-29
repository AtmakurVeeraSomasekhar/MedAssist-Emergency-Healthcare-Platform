import React, {
  useEffect,
  useState
} from "react";

import {
  connectSocket,
  sendMessage,
  disconnectSocket,
  sendTypingStatus
} from "../services/socket";

import {
  getChatHistory
} from "../services/chatApi";

function ChatRoom() {

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const [role, setRole] =
    useState("Patient");

  const [connected, setConnected] =
    useState(false);

  const [typingText, setTypingText] =
    useState("");

  const roomId =
    localStorage.getItem("activeRoomId")
    || "demo_room";

  const doctor =
    JSON.parse(
      localStorage.getItem("doctor")
    );

  const patientId =
    localStorage.getItem("activePatientId")
    || "patient-demo";

  /* =========================
     LOAD HISTORY + CONNECT SOCKET
  ========================= */

  useEffect(() => {

    loadHistory();

    connectSocket(

      // MESSAGE RECEIVED
      (message) => {

        if (
          message.roomId === roomId
        ) {

          setMessages((prev) => [
            ...prev,
            message
          ]);
        }
      },

      // SOCKET CONNECTED
      () => {

        console.log(
          "WebSocket Connected"
        );

        setConnected(true);
      },

      // TYPING RECEIVED
      (typingData) => {

        if (
          typingData.roomId === roomId &&
          typingData.senderRole !== role
        ) {

          setTypingText(
            `${typingData.senderRole} is typing...`
          );

          setTimeout(() => {
            setTypingText("");
          }, 1500);
        }
      }
    );

    return () => {

      disconnectSocket();
    };

  }, []);

  /* =========================
     LOAD OLD MESSAGES
  ========================= */

  const loadHistory =
    async () => {

      try {

        const history =
          await getChatHistory(
            roomId
          );

        setMessages(
          Array.isArray(history)
          ? history
          : []
        );

      } catch (error) {

        console.log(error);
      }
    };

  /* =========================
     SEND MESSAGE
  ========================= */

  const handleSend = () => {

    if (!connected) {

      alert(
        "WebSocket not connected yet"
      );

      return;
    }

    if (!text.trim()) return;

    const messageData = {

      roomId: roomId,

      senderId:
        role === "Doctor"
        ? doctor?.id || "doctor-demo"
        : patientId,

      receiverId:
        role === "Doctor"
        ? patientId
        : doctor?.id || "doctor-demo",

      senderRole: role,

      message: text,

      seen: false,

      messageType: "TEXT"
    };

    sendMessage(messageData);

    setText("");
  };

  /* =========================
     TYPING EVENT
  ========================= */

  const handleTyping =
    (e) => {

      setText(
        e.target.value
      );

      sendTypingStatus({

        roomId: roomId,

        senderRole: role
      });
    };

  return (

    <div style={styles.container}>

      <div style={styles.header}>

        <div>
          <h2 style={styles.title}>
            Emergency Consultation Chat
          </h2>

          <p style={styles.roomText}>
            Room: {roomId}
          </p>
        </div>

        <span
          style={{
            ...styles.statusBadge,
            background:
              connected
              ? "#16a34a"
              : "#dc2626"
          }}
        >
          {
            connected
            ? "Connected"
            : "Connecting"
          }
        </span>

      </div>

      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        style={styles.select}
      >

        <option>
          Patient
        </option>

        <option>
          Doctor
        </option>

      </select>

      <div style={styles.chatBox}>

        {
          messages.map(
            (msg, index) => (

            <div
              key={index}
              style={
                msg.senderRole === "Doctor"
                ? styles.doctorBubble
                : styles.patientBubble
              }
            >

              <strong>
                {msg.senderRole}
              </strong>

              <p>
                {msg.message}
              </p>

              <small style={styles.meta}>
                {
                  msg.seen
                  ? "Seen"
                  : "Delivered"
                }
              </small>

            </div>
          ))
        }

      </div>

      {
        typingText && (
          <p style={styles.typingText}>
            {typingText}
          </p>
        )
      }

      <div style={styles.inputArea}>

        <input
          value={text}
          onChange={handleTyping}
          placeholder="Type emergency message..."
          style={styles.input}
        />

        <button
          onClick={handleSend}
          style={styles.button}
        >
          Send
        </button>

      </div>

    </div>
  );
}

const styles = {

  container: {
    background: "white",
    padding: "24px",
    borderRadius: "24px",
    maxWidth: "900px",
    margin: "30px auto",
    boxShadow:
      "0 12px 40px rgba(0,0,0,0.18)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },

  title: {
    margin: 0,
    color: "#0f172a"
  },

  roomText: {
    color: "#64748b",
    fontSize: "13px"
  },

  statusBadge: {
    color: "white",
    padding: "8px 14px",
    borderRadius: "30px",
    fontWeight: "bold"
  },

  select: {
    width: "100%",
    padding: "14px",
    marginBottom: "18px",
    borderRadius: "12px",
    border: "1px solid #cbd5e1"
  },

  chatBox: {
    height: "500px",
    overflowY: "auto",
    background: "#f1f5f9",
    padding: "20px",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  patientBubble: {
    alignSelf: "flex-start",
    background: "#dbeafe",
    color: "#0f172a",
    padding: "14px",
    borderRadius: "16px",
    maxWidth: "70%"
  },

  doctorBubble: {
    alignSelf: "flex-end",
    background: "#dcfce7",
    color: "#0f172a",
    padding: "14px",
    borderRadius: "16px",
    maxWidth: "70%",
    textAlign: "right"
  },

  meta: {
    fontSize: "11px",
    color: "#64748b"
  },

  typingText: {
    color: "#2563eb",
    fontStyle: "italic",
    marginTop: "10px"
  },

  inputArea: {
    display: "flex",
    marginTop: "18px",
    gap: "12px"
  },

  input: {
    flex: 1,
    padding: "15px",
    borderRadius: "14px",
    border: "1px solid #cbd5e1",
    outline: "none"
  },

  button: {
    padding: "15px 28px",
    background:
      "linear-gradient(to right,#2563eb,#06b6d4)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ChatRoom;