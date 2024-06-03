import css from './image_container.module.css';
import ColorThief from 'colorthief';
import { React, useState, useEffect, useRef } from 'react';

const ImageContainer = ({ imageUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [errorMessage, setErrorMessage] = useState("");
  const imgRef = useRef(null);

  useEffect(() => {
    if (imageUpload instanceof File) {
      const fileType = imageUpload.type;

      if (!fileType.startsWith("image/")) {
        setErrorMessage("Uploaded file is not a image");
        setUploadedImage(null);
        setBackgroundColor("#fff");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setErrorMessage("");
      };
      reader.readAsDataURL(imageUpload);
    }
  }, [imageUpload]);

  useEffect(() => {
    if (uploadedImage) {
      const img = imgRef.current;
      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        setBackgroundColor(`rgb(${dominantColor.join(",")})`);
      };
    }
  }, [uploadedImage]);

  return (
    <div className={css.image_container} style={{ backgroundColor }}>
      <div className={css.image}>
        {uploadedImage ? (
          <img ref={imgRef} src={uploadedImage} alt="uploaded_image" crossOrigin="anonymous" />
        ) : (
          <h2>{errorMessage || "No image selected"}</h2>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
