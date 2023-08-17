import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdpropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={style.overlay} onClick={handleBackdpropClick}>
      <div className={style.modal}>{children}</div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  handleBackdpropClick: PropTypes.func,
};
