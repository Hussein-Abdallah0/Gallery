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
  const [editedImage, setEditedImage] = useState(image.src);
  const [watermarkText, setWatermarkText] = useState("");
  const [isWatermarking, setIsWatermarking] = useState(false);
  const [tool, setTool] = useState(null);
  const handleCropClick = () => setTool("crop");
  const cancelTool = () => setTool(null);
  const finishTool = () => {
    setTool(null);
    window.location.reload(); // or refetch images
  };

  const applyBlackAndWhite = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = image.src;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Loop through each pixel and convert to grayscale
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);

      const grayImageSrc = canvas.toDataURL();
      setEditedImage(grayImageSrc); // you’ll define this below
    };
  };

  const handleWatermark = () => {
    setIsWatermarking(true);
  };

  const applyWatermark = () => {
    if (!watermarkText) return;

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Set watermark text properties
      ctx.font = "200px Arial";
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; // white with transparency
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Add watermark text to the center
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);

      const watermarkedImage = canvas.toDataURL();
      setEditedImage(watermarkedImage); // Update the image with watermark
    };
  };

  // Rotate 90 degrees counterclockwise
  const rotateLeft = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      canvas.width = height;
      canvas.height = width;
      const ctx = canvas.getContext("2d");

      // Rotate image on canvas
      ctx.translate(height / 2, width / 2); // Move to center
      ctx.rotate(-90 * (Math.PI / 180)); // Rotate by -90 degrees
      ctx.drawImage(img, -width / 2, -height / 2); // Draw the image at the new position

      const rotatedImage = canvas.toDataURL();
      setEditedImage(rotatedImage); // Update the image with rotation
    };
  };

  // Rotate 90 degrees clockwise
  const rotateRight = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      canvas.width = height;
      canvas.height = width;
      const ctx = canvas.getContext("2d");

      // Rotate image on canvas
      ctx.translate(height / 2, width / 2); // Move to center
      ctx.rotate(90 * (Math.PI / 180)); // Rotate by 90 degrees
      ctx.drawImage(img, -width / 2, -height / 2); // Draw the image at the new position

      const rotatedImage = canvas.toDataURL();
      setEditedImage(rotatedImage); // Update the image with rotation
    };
  };

  // Flip the image horizontally
  const flipHorizontal = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Flip horizontally
      ctx.scale(-1, 1); // Flip the image horizontally
      ctx.drawImage(img, -img.width, 0); // Draw the flipped image

      const flippedImage = canvas.toDataURL();
      setEditedImage(flippedImage); // Update the image with flip
    };
  };

  // Flip the image vertically
  const flipVertical = () => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = editedImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      // Flip vertically
      ctx.scale(1, -1); // Flip the image vertically
      ctx.drawImage(img, 0, -img.height); // Draw the flipped image

      const flippedImage = canvas.toDataURL();
      setEditedImage(flippedImage); // Update the image with flip
    };
  };

  return (
    <div className="edit-page">
      <div className="edit-panel">
        <div className="edit-header">
          <div className="edit-options">
            <div title="Crop" onClick={handleCropClick}>
              <Crop className="edit-icon" size={32} />
            </div>
            <div title="Black & White" onClick={applyBlackAndWhite}>
              <PaintBucket className="edit-icon" size={32} />
            </div>
            <div title="Watermark" onClick={handleWatermark} style={{ cursor: "pointer" }}>
              <FileUser className="edit-icon" size={32} />
            </div>
          </div>
          {isWatermarking && (
            <div>
              <input
                type="text"
                placeholder="Enter watermark text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                onBlur={() => {
                  setIsWatermarking(false); // Hide input on blur
                  applyWatermark(); // Apply watermark on blur
                }}
                className="watermark-input"
              />
            </div>
          )}
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
            <img src={editedImage} alt="Edited" className="edit-preview" />
          )}
        </div>

        {/* bottom edit options */}
        <div className="rotate-options">
          <div className="flex">
            <div className="rotate" title="rotate90left" onClick={rotateLeft}>
              <RotateCcw className="edit-icon" size={32} />
            </div>
            <div className="rotate" title="rotate90right" onClick={rotateRight}>
              <RotateCw className="edit-icon" size={32} />
            </div>
          </div>
          <div className="flex">
            <div className="rotate" title="flipHorizontal" onClick={flipHorizontal}>
              <ArrowLeftRight className="edit-icon" size={32} />
            </div>
            <div className="rotate" title="flipVertical" onClick={flipVertical}>
              <ArrowUpDown className="edit-icon" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
