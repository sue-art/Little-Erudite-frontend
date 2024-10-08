import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
      <button className="modal-close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Modal;
