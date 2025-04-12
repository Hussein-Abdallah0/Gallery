import { useState, useEffect, useCallback } from "react";
import { initializeSocket, setupSocketListeners } from "../services/socketSerice";
import axiosBaseUrl from "../utils/axios";

export const useChat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("Anonymous");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosBaseUrl.get("/me");
        setUser(response.data.username);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosBaseUrl.get("/global-messages");
        const dbMessages = response.data.map((msg) => ({
          user: msg.sender_name,
          text: msg.content,
          timestamp: msg.created_at,
        }));
        setMessages(dbMessages.reverse()); // reverse if using latest() in controller
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError("Failed to load messages");
      }
    };

    if (user && user !== "Anonymous") {
      fetchMessages();
    }
  }, [user]);

  // Initialize socket connection
  useEffect(() => {
    if (!user || user === "Anonymous") return;

    const token = sessionStorage.getItem("token");
    const newSocket = initializeSocket(token);

    const cleanupListeners = setupSocketListeners(newSocket, {
      onConnectError: (err) => {
        console.log("Connection Error:", err);
        setError("Connection error - try refreshing");
      },
      onMessage: (data) => {
        setMessages((prev) => [...prev, data]);
      },
    });

    setSocket(newSocket);

    return () => {
      cleanupListeners?.();
      newSocket.disconnect();
    };
  }, [user]);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;

    try {
      // Save to database
      await axiosBaseUrl.post("/global-messages", {
        sender_name: user,
        content: input,
      });

      // Broadcast via socket
      const messageData = {
        text: input,
        user: user,
        timestamp: new Date().toISOString(),
      };

      socket.emit("message", messageData);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [input, socket, user]);

  return {
    messages,
    input,
    setInput,
    user,
    isLoading,
    error,
    sendMessage,
  };
};
