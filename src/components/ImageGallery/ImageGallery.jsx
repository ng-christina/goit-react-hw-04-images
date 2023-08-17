import React from 'react';
import style from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={style.imageGallery}>{children}</ul>;
};

export default ImageGallery;
