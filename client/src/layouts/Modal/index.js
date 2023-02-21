import React, { Fragment } from "react";

// Styles
import Close from "../../icons/Close.png";
import "./index.css";

const Modal = ({ isOpen, children, closeModalHandler }) => {
  return (
    <Fragment>
      <div
        className={`modal-backDrop ${isOpen ? "modal-show" : "modal-hide"}`}
      ></div>
      <div
        className={`modal-container ${isOpen ? "modal-show" : "modal-hide"}`}
      >
        <div className="modal-close">
          <img
            src={Close}
            className="modal-close-icon"
            alt="X"
            onClick={closeModalHandler}
          />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
