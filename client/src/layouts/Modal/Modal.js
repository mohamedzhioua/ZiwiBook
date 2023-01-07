import React from "react";
import Close from "../../images/Close.png";
import "./Modal.css";
import AddEditForm from "../../components/AddEditForm/AddEditForm";

const Modal = () => {
  return (
    <div className="container">
      <div className="modal-backDrop"></div>
      <div className="modal-container">
        <div className="modal-close">
          <img src={Close} className="modal-close-icon" alt="X" />
        </div>
        <div className="modal-content">
          <AddEditForm />
        </div>
      </div>
    </div>
  );
};

export default Modal;
