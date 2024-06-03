import { React, useState, useEffect } from 'react';
import css from './main.module.css';
import ImageContainer from './Content/ImageContainer/ImageContainer';
import ColorThief from 'colorthief';
import ColorCard from './Content/ColorCard/ColorCard';

const Main = ({ imageUpload }) => {
  const [colorPalette, setColorPalette] = useState(null);

  useEffect(() => {
    if (imageUpload instanceof File) {
      const fileType = imageUpload.type;

      if (!fileType.startsWith("image/")) {
        setColorPalette(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;

        image.onload = () => {
          const colorThief = new ColorThief();
          const palette = colorThief.getPalette(image, 8);
          setColorPalette(palette);
        };
      };
      reader.readAsDataURL(imageUpload);
    } else {
      setColorPalette(null);
    }
  }, [imageUpload]);

  return (
    <div className={css.main}>
      <ImageContainer imageUpload={imageUpload} />
      <div className={css.color_container}>
        {colorPalette ? (
          colorPalette.map((color, index) => (
            <ColorCard key={index} color={color} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Main;
