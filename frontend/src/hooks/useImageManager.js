import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImages, setSelectedImage } from "../redux/imagesSlice";
import { loadImagesFromDirectory, saveUploadedFile } from "../services/fileSystemService";

export const useImageManager = () => {
  const dispatch = useDispatch();

  const loadImages = () => {
    try {
      const images = loadImagesFromDirectory();
      dispatch(setImages(images));
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await saveUploadedFile(file);
      loadImages();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return {
    loadImages,
    handleUpload,
  };
};
