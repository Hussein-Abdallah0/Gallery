import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axiosBaseUrl from "../../utils/axios";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("Anonymous");
  const navigate = useNavigate();

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      auth: {
        token: sessionStorage.getItem("token"),
      },
      transports: ["websocket"], // Force WebSocket transport
      reconnectionAttempts: 5, // Retry up to 5 times
      reconnectionDelay: 1000,
    });

    newSocket.on("connect_error", (err) => {
      console.log("Connection Error:", err);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosBaseUrl.get("/me");
        setUser(response.data.username);
      } catch (error) {
        console.log(response);
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  // Send a message
  const sendMessage = () => {
    if (input.trim() && socket) {
      const messageData = {
        text: input,
        user: user,
        timestamp: new Date().toISOString(),
      };

      // Add message to local state immediately
      setMessages((prev) => [...prev, messageData]);
      setInput("");

      // Then emit to server
      socket.emit("message", messageData);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Global Chat</h2>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "5px" }}>
            <strong>{msg.user}: </strong>
            <span>{msg.text}</span>
            <small style={{ color: "#666", marginLeft: "5px" }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ width: "70%", padding: "8px" }}
      />
      <button onClick={sendMessage} style={{ padding: "8px 15px", marginLeft: "5px" }}>
        Send
      </button>
    </div>
  );
}

export default Chat;
