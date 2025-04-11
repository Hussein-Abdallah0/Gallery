const fs = window.require("fs");
const path = window.require("path");
const os = window.require("os");

const userHomeDir = os.homedir();
const saveDir = path.join(userHomeDir, "ElectronPhotoApp", "user_images");

export const ensureDirectoryExists = () => {
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
  }
  return saveDir;
};

export const loadImagesFromDirectory = () => {
  ensureDirectoryExists();
  const files = fs.readdirSync(saveDir);
  return files
    .filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file))
    .map((file) => {
      const fullPath = path.join(saveDir, file);
      const imageBuffer = fs.readFileSync(fullPath);
      const ext = path.extname(file).substring(1);
      const base64 = imageBuffer.toString("base64");
      return {
        src: `data:image/${ext};base64,${base64}`,
        path: fullPath,
      };
    });
};

export const saveUploadedFile = (file) => {
  return new Promise((resolve, reject) => {
    ensureDirectoryExists();
    const reader = new FileReader();

    reader.onload = function () {
      const buffer = Buffer.from(this.result);
      const savePath = path.join(saveDir, file.name);

      fs.writeFile(savePath, buffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};
