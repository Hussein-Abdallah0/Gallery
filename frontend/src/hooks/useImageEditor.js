import { useState } from "react";
import { applyBlackAndWhite, applyWatermark, rotateImage, flipImage } from "../utils/imageUtils";
import { saveImage } from "../services/fileService";

export const useImageEditor = (initialImage) => {
  const [editedImage, setEditedImage] = useState(initialImage?.src || "");
  const [activeTool, setActiveTool] = useState(null);
  const [watermarkText, setWatermarkText] = useState("");

  const applyTool = async (tool, options = {}) => {
    switch (tool) {
      case "blackAndWhite":
        setEditedImage(await applyBlackAndWhite(editedImage));
        break;
      case "watermark":
        setEditedImage(await applyWatermark(editedImage, options.text));
        break;
      case "rotateLeft":
        setEditedImage(await rotateImage(editedImage, -90));
        break;
      case "rotateRight":
        setEditedImage(await rotateImage(editedImage, 90));
        break;
      case "flipHorizontal":
        setEditedImage(await flipImage(editedImage, "horizontal"));
        break;
      case "flipVertical":
        setEditedImage(await flipImage(editedImage, "vertical"));
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    if (!initialImage?.path) return;
    await saveImage(initialImage.path, editedImage);
  };

  return {
    editedImage,
    activeTool,
    watermarkText,
    setWatermarkText,
    setActiveTool,
    applyTool,
    handleSave,
  };
};
