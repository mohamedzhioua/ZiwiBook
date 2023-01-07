import React, { Fragment } from "react";
import Close from "../../images/Close.png";
import "./Modal.css";
import { useSelector } from "react-redux";

const Modal = () => {
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <Fragment>
      <div
        className={`modal-backDrop ${isOpen ? "modal-show" : "modal-hide"}`}
      ></div>
      <div
        className={`modal-container ${isOpen ? "modal-show" : "modal-hide"}`}
      >
        <div className="modal-close">
          <img src={Close} className="modal-close-icon" alt="X" />
        </div>
        <div className="modal-content"></div>
      </div>
    </Fragment>
  );
};

export default Modal;
