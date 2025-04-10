import React, { useEffect } from "react";
import "./Home.css";
import Edit from "../Edit/Edit";
import { useSelector, useDispatch } from "react-redux";
import { setImages, setSelectedImage, setIsEditing } from "../../redux/imagesSlice";
const fs = window.require("fs");
const path = window.require("path");
const os = window.require("os");

const Home = () => {
  const { images, selectedImage, isEditing } = useSelector((state) => state.images);
  const dispatch = useDispatch();

  const userHomeDir = os.homedir();
  const saveDir = path.join(userHomeDir, "ElectronPhotoApp", "user_images");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = this.result;
      const buffer = Buffer.from(arrayBuffer);

      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }

      const savePath = path.join(saveDir, file.name);

      fs.writeFile(savePath, buffer, (err) => {
        if (err) {
          console.error("Failed to save image:", err);
        } else {
          loadImages();
        }
      });
    };

    reader.readAsArrayBuffer(file);
  };

  const loadImages = () => {
    if (!fs.existsSync(saveDir)) return;

    const files = fs.readdirSync(saveDir);
    const imageList = [];

    files.forEach((file) => {
      if (/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file)) {
        const fullPath = path.join(saveDir, file);
        const imageBuffer = fs.readFileSync(fullPath);
        const base64 = imageBuffer.toString("base64");
        const ext = path.extname(file).substring(1);
        const dataUrl = `data:image/${ext};base64,${base64}`;
        imageList.push({ src: dataUrl, path: fullPath });
      }
    });

    dispatch(setImages(imageList));
  };

  const handleImageClick = (img) => {
    dispatch(setSelectedImage(selectedImage?.src === img.src ? null : img));
  };

  const handleDelete = () => {
    if (selectedImage && selectedImage.path) {
      fs.unlink(selectedImage.path, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        } else {
          dispatch(setSelectedImage(null));
          loadImages();
        }
      });
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

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
