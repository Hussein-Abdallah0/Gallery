import { useState, useCallback } from "react";
import { getCroppedImg } from "../services/imageCropService";

export const useImageCropper = (initialImage, onSuccess) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = async () => {
    if (!croppedAreaPixels || !initialImage?.path) return;

    setIsCropping(true);
    try {
      await getCroppedImg(initialImage.src, croppedAreaPixels, initialImage.path);
      onSuccess?.();
    } catch (error) {
      console.error("Cropping failed:", error);
    } finally {
      setIsCropping(false);
    }
  };

  return {
    crop,
    zoom,
    isCropping,
    setCrop,
    setZoom,
    onCropComplete,
    handleApply,
  };
};
