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

  const sendMessage = useCallback(() => {
    if (!input.trim() || !socket) return;

    const messageData = {
      text: input,
      user,
      timestamp: new Date().toISOString(),
    };

    // Optimistic update
    setMessages((prev) => [...prev, messageData]);
    setInput("");
    socket.emit("message", messageData);
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
