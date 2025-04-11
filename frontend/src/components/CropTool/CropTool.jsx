import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useImageCropper } from "../../hooks/useImageCropper";
import "./CropTool.css";

const CropTool = ({ image, onCancel, onDone }) => {
  const { crop, zoom, isCropping, setCrop, setZoom, onCropComplete, handleApply } = useImageCropper(
    image,
    onDone
  );

  return (
    <div className="crop-area">
      <div>
        <Cropper
          image={image.src}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="crop-buttons">
        <button className="primary-btn" onClick={handleApply} disabled={isCropping}>
          Apply
        </button>
        <button className="secondary-btn" onClick={onCancel} disabled={isCropping}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CropTool;
