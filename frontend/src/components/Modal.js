import React, { useEffect, useState } from 'react';
import '../styles/Modal.scss';

const Modal = ({ children, onClose, isOpen }) => {
  const [showModal, setShowModal] = useState(false); // New state for showing the modal

  useEffect(() => {
    if (isOpen) {
      setShowModal(true); // Set modal as visible
    } else {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className={`modal-overlay ${showModal ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;