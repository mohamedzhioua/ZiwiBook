import Close from "../../assets/icons/Close.png";
import Portal from "../../utils/Portal";
import "./index.css";

const Modal = ({ isOpen, children, closeModalHandler }) => {
  return (
    <Portal>
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
    </Portal>
  );
};

export default Modal;
