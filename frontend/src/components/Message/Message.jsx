import React from "react";
import PropTypes from "prop-types";

const Message = ({ user, text, timestamp }) => {
  return (
    <div className="message">
      <strong className="message-user">{user}: </strong>
      <span className="message-text">{text}</span>
      <small className="message-time">{new Date(timestamp).toLocaleTimeString()}</small>
    </div>
  );
};

Message.propTypes = {
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Message;
