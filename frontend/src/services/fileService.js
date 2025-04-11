const fs = window.require("fs");

export const saveImage = (imagePath, base64Data) => {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(base64Data.replace(/^data:image\/\w+;base64,/, ""), "base64");
    fs.writeFile(imagePath, buffer, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const deleteImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(imagePath, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
