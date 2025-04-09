import React, { useState } from "react";
import "./Edit.css";
import {
  ArrowLeftRight,
  ArrowUpDown,
  Crop,
  FileUser,
  PaintBucket,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import CropTool from "../../components/CropTool/CropTool";

const Edit = ({ image, onClose }) => {
  const [tool, setTool] = useState(null);
  const handleCropClick = () => setTool("crop");
  const cancelTool = () => setTool(null);
  const finishTool = () => {
    setTool(null);
    window.location.reload(); // or refetch images
  };

  return (
    <div className="edit-page">
      <div className="edit-panel">
        <div className="edit-header">
          <div className="edit-options">
            <div title="Crop" onClick={handleCropClick}>
              <Crop className="edit-icon" size={32} />
            </div>
            <div title="Black & White">
              <PaintBucket className="edit-icon" size={32} />
            </div>
            <div title="Watermark">
              <FileUser className="edit-icon" size={32} />
            </div>
          </div>
          <div>
            <button className="primary-btn">Save</button>
            <button className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>

        {/* image */}
        <div className="edit-preview-wrapper">
          {tool === "crop" ? (
            <CropTool image={image} onCancel={cancelTool} onDone={finishTool} />
          ) : (
            <img src={image.src} alt="To edit" className="edit-preview" />
          )}
        </div>
        {/* bottom edit options */}
        <div className="rotate-options">
          <div className="rotate" title="Rotate">
            <RotateCcw className="edit-icon" size={32} />
            <RotateCw className="edit-icon" size={32} />
          </div>
          <div className="rotate" title="Flip">
            <ArrowLeftRight className="edit-icon" size={32} />
            <ArrowUpDown className="edit-icon" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
