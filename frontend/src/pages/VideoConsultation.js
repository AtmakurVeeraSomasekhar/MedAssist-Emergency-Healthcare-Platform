import React, {
  useRef,
  useState
} from "react";

function VideoConsultation() {

  const localVideoRef =
    useRef(null);

  const [joined, setJoined] =
    useState(false);

  const [muted, setMuted] =
    useState(false);

  const [cameraOff, setCameraOff] =
    useState(false);

  const localStreamRef =
    useRef(null);

  const joinRoom = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

      localStreamRef.current =
        stream;

      if (localVideoRef.current) {

        localVideoRef.current.srcObject =
          stream;
      }

      setJoined(true);

    } catch (error) {

      console.log(error);

      alert(
        "Camera permission denied"
      );
    }
  };

  const toggleMute = () => {

    const audioTrack =
      localStreamRef.current
        ?.getAudioTracks()[0];

    if (audioTrack) {

      audioTrack.enabled =
        !audioTrack.enabled;

      setMuted(
        !audioTrack.enabled
      );
    }
  };

  const toggleCamera = () => {

    const videoTrack =
      localStreamRef.current
        ?.getVideoTracks()[0];

    if (videoTrack) {

      videoTrack.enabled =
        !videoTrack.enabled;

      setCameraOff(
        !videoTrack.enabled
      );
    }
  };

  const endCall = () => {

    localStreamRef.current
      ?.getTracks()
      .forEach((track) =>
        track.stop()
      );

    if (localVideoRef.current) {

      localVideoRef.current.srcObject =
        null;
    }

    setJoined(false);
  };

  return (

    <div style={styles.page}>

      <h1 style={styles.title}>
        🎥 Video Consultation
      </h1>

      <div style={styles.videoCard}>

        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={styles.video}
        />

      </div>

      <div style={styles.controls}>

        <button
          onClick={joinRoom}
          style={styles.joinBtn}
        >
          Join Room
        </button>

        <button
          onClick={toggleMute}
          style={styles.controlBtn}
        >
          {
            muted
            ? "Unmute"
            : "Mute"
          }
        </button>

        <button
          onClick={toggleCamera}
          style={styles.controlBtn}
        >
          {
            cameraOff
            ? "Camera On"
            : "Camera Off"
          }
        </button>

        <button
          onClick={endCall}
          style={styles.endBtn}
        >
          End Call
        </button>

      </div>

      {
        joined && (
          <p style={styles.status}>
            ✅ Camera Connected
          </p>
        )
      }

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(to right,#020617,#1e3a8a)",
    padding: "40px",
    color: "white",
    textAlign: "center"
  },

  title: {
    fontSize: "42px",
    marginBottom: "30px"
  },

  videoCard: {
    width: "700px",
    maxWidth: "100%",
    margin: "auto",
    background: "white",
    borderRadius: "25px",
    padding: "20px"
  },

  video: {
    width: "100%",
    height: "450px",
    borderRadius: "20px",
    background: "black",
    objectFit: "cover"
  },

  controls: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  },

  joinBtn: {
    padding: "15px 24px",
    background: "#2563eb",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  controlBtn: {
    padding: "15px 24px",
    background: "#f59e0b",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  endBtn: {
    padding: "15px 24px",
    background: "#dc2626",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  status: {
    marginTop: "25px",
    fontSize: "22px"
  }
};

export default VideoConsultation;