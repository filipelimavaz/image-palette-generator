import React, { useState } from 'react';
import css from './color_card.module.css';

const ColorCard = ({ color }) => {
  const rgb = `rgb(${color.join(",")})`;
  
  const toHex = (rgbComponents) => {
    let hex = "#";
    for (let i = 0; i < rgbComponents.length; i++) {
      let componentHex = rgbComponents[i].toString(16);
      hex += componentHex.length === 1 ? "0" + componentHex : componentHex;
    }
    return hex;
  };

  const setBackgroundColor = {
    backgroundColor: toHex(color)
  };

  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => {
        setCopiedText('');
      }, 1000);
    });
  };

  return (
    <div className={css.color_card} style={setBackgroundColor}>
      <div className={css.color_number}>
        <span onClick={() => copyToClipboard(toHex(color))}>
          {copiedText === toHex(color) ? 'Color copied!' : toHex(color)}
          <i className="fa-solid fa-copy"></i>
        </span>
        <span onClick={() => copyToClipboard(rgb)}>
          {copiedText === rgb ? 'Color copied!' : rgb}
          <i className="fa-solid fa-copy"></i>
        </span>
      </div>
    </div>
  );
};

export default ColorCard;
