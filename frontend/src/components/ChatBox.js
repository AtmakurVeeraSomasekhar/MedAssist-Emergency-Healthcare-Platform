import React, {
  useEffect,
  useState
} from 'react';

import {
  connectSocket,
  sendMessage,
  disconnectSocket
} from '../services/socket';

function ChatBox() {

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState('');

  const [sender, setSender] =
    useState('Patient');

  useEffect(() => {

    connectSocket((message) => {

      setMessages((prev) => [
        ...prev,
        message
      ]);
    });

    return () => {

      disconnectSocket();
    };

  }, []);

  const handleSend = () => {

    if (!text.trim()) return;

    const messageData = {

      sender: sender,

      content: text
    };

    sendMessage(messageData);

    setText('');
  };

  return (

    <div style={styles.container}>

      <select
        value={sender}
        onChange={(e) =>
          setSender(e.target.value)
        }
        style={styles.select}
      >

        <option value="Patient">
          Patient
        </option>

        <option value="Doctor">
          Doctor
        </option>

      </select>

      <div style={styles.chatArea}>

        {
          messages.map((msg, index) => (

            <div
              key={index}
              style={
                msg.sender === 'Doctor'
                ? styles.doctorMessage
                : styles.patientMessage
              }
            >

              <strong>
                {msg.sender}
              </strong>

              <p>
                {msg.content}
              </p>

            </div>
          ))
        }

      </div>

      <div style={styles.inputArea}>

        <input
          type="text"
          placeholder="Type message..."
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
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
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    maxWidth: '700px',
    margin: 'auto',
    boxShadow:
      '0px 4px 20px rgba(0,0,0,0.2)'
  },

  select: {
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '20px',
    width: '100%',
    fontSize: '16px'
  },

  chatArea: {
    height: '400px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '15px',
    background: '#f8fafc'
  },

  patientMessage: {
    background: '#dbeafe',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '12px',
    textAlign: 'left'
  },

  doctorMessage: {
    background: '#dcfce7',
    padding: '12px',
    borderRadius: '12px',
    marginBottom: '12px',
    textAlign: 'right'
  },

  inputArea: {
    display: 'flex',
    gap: '10px'
  },

  input: {
    flex: 1,
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #ccc'
  },

  button: {
    padding: '15px 25px',
    border: 'none',
    background: '#2563eb',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default ChatBox;