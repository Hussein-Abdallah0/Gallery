import React, { useEffect, useState } from "react";
import "./Home.css";
const fs = window.require("fs");
const path = window.require("path");
const os = window.require("os");

const Home = () => {
  const [images, setImages] = useState([]);

  const userHomeDir = os.homedir();
  const saveDir = path.join(userHomeDir, "ElectronPhotoApp", "user_images");

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Read the file
    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = this.result;
      const buffer = Buffer.from(arrayBuffer);

      // Define the destination path
      // const userHomeDir = os.homedir();
      // const saveDir = path.join(userHomeDir, "ElectronPhotoApp", "user_images");

      // Ensure directory exists
      if (!fs.existsSync(saveDir)) {
        fs.mkdirSync(saveDir, { recursive: true });
      }

      const savePath = path.join(saveDir, file.name);

      // Save the image file
      fs.writeFile(savePath, buffer, (err) => {
        if (err) {
          console.error("Failed to save image:", err);
        } else {
          console.log("Image saved to:", savePath);
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
        const ext = path.extname(file).substring(1); // remove the dot
        const dataUrl = `data:image/${ext};base64,${base64}`;
        imageList.push(dataUrl);
      }
    });

    setImages(imageList);
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="photos">
      <div className="row">
        <h1 className="">Photos</h1>
        <div className="upload-section">
          <input type="file" id="image-upload" onChange={handleUpload} />
          <label htmlFor="image-upload" className="primary-btn">
            Upload Image
          </label>
        </div>
      </div>
      <div className="gallery">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`uploaded-${index}`} className="image-thumbnail" />
        ))}
      </div>
    </div>
  );
};

export default Home;
