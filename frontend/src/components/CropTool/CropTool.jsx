// src/components/CropTool.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
const fs = window.require("fs");
import "./CropTool.css";

const getCroppedImg = async (imageSrc, crop, filePath) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error("Canvas is empty"));

        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = () => {
          const buffer = Buffer.from(reader.result);
          fs.writeFile(filePath, buffer, (err) => {
            if (err) reject(err);
            else resolve("Image cropped and saved.");
          });
        };
      }, "image/jpeg");
    };
    image.onerror = reject;
  });
};

const CropTool = ({ image, onCancel, onDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = async () => {
    try {
      await getCroppedImg(image.src, croppedAreaPixels, image.path);
      onDone(); // triggers reload or closes crop mode
    } catch (err) {
      console.error("Cropping failed:", err);
    }
  };

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
        <button className="primary-btn" onClick={handleApply}>
          Apply
        </button>
        <button className="secondary-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CropTool;
