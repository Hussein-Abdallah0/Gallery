import React from "react";
import "./Edit.css";

const Edit = ({ image, onClose }) => {
  return (
    <div className="edit-panel">
      <div className="edit-header">
        <h2>Edit Image</h2>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      {/* Add editing tools here */}
      <div className="edit-options">
        <button>Crop</button>
        <button>Rotate</button>
        <button>Black & White</button>
        <button>Watermark</button>
      </div>
      <img src={image.src} alt="To edit" className="edit-preview" />
    </div>
  );
};

export default Edit;
