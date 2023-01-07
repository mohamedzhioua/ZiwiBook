import React, { Fragment } from "react";
import { closeModal } from "../../app/features/modal/modalSlice";
import Close from "../../images/Close.png";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";
import AddEditForm from "../../components/AddEditForm/AddEditForm"
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen , componentName } = useSelector((state) => state.modal);
  const closeModalHandler = () => dispatch(closeModal());
  const componentHandler = () =>{
    if (componentName ==='AddEditForm'){
      return <AddEditForm/>
      
    } else if (componentName ==='DeleteConfirm'){
      return <DeleteConfirm/>
     }
  }
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
        <div className="modal-content">{componentHandler()}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
