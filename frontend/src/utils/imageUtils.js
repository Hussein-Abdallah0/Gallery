export const applyBlackAndWhite = (imageSrc) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = data[i + 1] = data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
  });
};

export const applyWatermark = (imageSrc, watermarkText) => {
  return new Promise((resolve) => {
    if (!watermarkText) return resolve(imageSrc);

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      ctx.font = `${Math.min(canvas.width, canvas.height) * 0.2}px Arial`;
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(watermarkText, canvas.width / 2, canvas.height / 2);

      resolve(canvas.toDataURL());
    };
  });
};

export const rotateImage = (imageSrc, degrees) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      canvas.width = degrees % 180 === 0 ? width : height;
      canvas.height = degrees % 180 === 0 ? height : width;

      const ctx = canvas.getContext("2d");
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(degrees * (Math.PI / 180));
      ctx.drawImage(img, -width / 2, -height / 2);

      resolve(canvas.toDataURL());
    };
  });
};

export const flipImage = (imageSrc, direction) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (direction === "horizontal") {
        ctx.scale(-1, 1);
        ctx.drawImage(img, -img.width, 0);
      } else {
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, -img.height);
      }

      resolve(canvas.toDataURL());
    };
  });
};
