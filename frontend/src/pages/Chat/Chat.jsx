import React from "react";
import Message from "../../components/Message/Message";
import { useChat } from "../../hooks/useChat";
import "./Chat.css";

const Chat = () => {
  const { messages, input, setInput, user, isLoading, error, sendMessage } = useChat();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (isLoading) return <div className="chat-loading">Loading chat...</div>;
  if (error) return <div className="chat-error">{error}</div>;

  return (
    <div className="chat-container">
      <h2 className="chat-header">Global Chat</h2>
      <div className="messages-container">
        {messages.map((msg, i) => (
          <Message
            key={`${msg.timestamp}-${i}`}
            user={msg.user}
            text={msg.text}
            timestamp={msg.timestamp}
          />
        ))}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="message-input"
          disabled={!user || user === "Anonymous"}
        />
        <button
          onClick={sendMessage}
          className="send-button"
          disabled={!input.trim() || !user || user === "Anonymous"}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
