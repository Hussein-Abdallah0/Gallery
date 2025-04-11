import React from "react";
import "./Home.css";
import Edit from "../Edit/Edit";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedImage, setIsEditing } from "../../redux/imagesSlice";
import { deleteImage } from "../../services/fileService";
import { useImageManager } from "../../hooks/useImageManager";

const Home = () => {
  const { images, selectedImage, isEditing } = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const { loadImages, handleUpload } = useImageManager();

  const handleImageClick = (img) => {
    dispatch(setSelectedImage(selectedImage?.src === img.src ? null : img));
  };

  const handleDelete = async () => {
    if (!selectedImage?.path) return;

    try {
      await deleteImage(selectedImage.path);
      dispatch(setSelectedImage(null));
      loadImages();
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <div className="photos">
      <div className="row">
        <h1 className="">Photos</h1>
        {isEditing && selectedImage && (
          <Edit
            image={selectedImage}
            onClose={() => dispatch(setIsEditing(false))}
            reloadImages={loadImages}
          />
        )}
        <div className="right">
          {selectedImage && (
            <div className="edit-toolbar">
              <button className="secondary-btn" onClick={() => dispatch(setIsEditing(true))}>
                Edit
              </button>
              <button className="delete-btn primary-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
          <div className="upload-section">
            <label htmlFor="image-upload" className="upload-btn">
              Upload
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>

      <div className="gallery">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${selectedImage?.src === image.src ? "selected" : ""}`}
            onClick={() => handleImageClick(image)}
          >
            <img src={image.src} alt={`uploaded-${index}`} className="image-thumbnail" />
            {selectedImage?.src === image.src && (
              <div className="overlay">
                <span className="checkmark">✔</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
