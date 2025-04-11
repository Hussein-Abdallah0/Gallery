import React from "react";
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
import { useImageEditor } from "../../hooks/useImageEditor";

const Edit = ({ image, onClose, reloadImages }) => {
  const {
    editedImage,
    activeTool,
    watermarkText,
    setWatermarkText,
    setActiveTool,
    applyTool,
    handleSave,
  } = useImageEditor(image);

  const handleSaveAndClose = async () => {
    await handleSave();
    reloadImages();
    onClose();
  };

  return (
    <div className="edit-page">
      <div className="edit-panel">
        <div className="edit-header">
          <div className="edit-options">
            <div title="Crop" onClick={() => setActiveTool("crop")}>
              <Crop className="edit-icon" size={32} />
            </div>
            <div title="Black & White" onClick={() => applyTool("blackAndWhite")}>
              <PaintBucket className="edit-icon" size={32} />
            </div>
            <div title="Watermark" onClick={() => setActiveTool("watermark")}>
              <FileUser className="edit-icon" size={32} />
            </div>
          </div>
          {activeTool === "watermark" && (
            <div>
              <input
                type="text"
                placeholder="Enter watermark text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                onBlur={() => {
                  setActiveTool(null);
                  applyTool("watermark", { text: watermarkText });
                }}
                className="watermark-input"
              />
            </div>
          )}
          <div>
            <button className="primary-btn" onClick={handleSaveAndClose}>
              Save
            </button>
            <button className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
        {/* image */}
        <div className="edit-preview-wrapper">
          {activeTool === "crop" ? (
            <CropTool
              image={{ ...image, src: editedImage }}
              onCancel={() => setActiveTool(null)}
              onDone={() => {
                setActiveTool(null);
                window.location.reload();
              }}
            />
          ) : (
            <img src={editedImage} alt="Edited" className="edit-preview" />
          )}
        </div>

        {/* bottom edit options */}
        <div className="rotate-options">
          <div className="flex">
            <div className="rotate" title="rotate90left" onClick={() => applyTool("rotateLeft")}>
              <RotateCcw className="edit-icon" size={32} />
            </div>
            <div className="rotate" title="rotate90right" onClick={() => applyTool("rotateRight")}>
              <RotateCw className="edit-icon" size={32} />
            </div>
          </div>
          <div className="flex">
            <div
              className="rotate"
              title="flipHorizontal"
              onClick={() => applyTool("flipHorizontal")}
            >
              <ArrowLeftRight className="edit-icon" size={32} />
            </div>
            <div className="rotate" title="flipVertical" onClick={() => applyTool("flipVertical")}>
              <ArrowUpDown className="edit-icon" size={32} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
