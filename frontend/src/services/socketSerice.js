import io from "socket.io-client";

export const initializeSocket = (token) => {
  return io("http://localhost:8080", {
    auth: { token },
    transports: ["websocket"],
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
};

export const setupSocketListeners = (socket, handlers) => {
  if (!socket) return;

  socket.on("connect_error", handlers.onConnectError);
  socket.on("message", handlers.onMessage);

  return () => {
    socket.off("connect_error", handlers.onConnectError);
    socket.off("message", handlers.onMessage);
  };
};
