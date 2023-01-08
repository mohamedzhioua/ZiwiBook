import React, { Fragment } from "react";
import { closeModal } from "../../app/features/modal/modalSlice";
import Close from "../../images/Close.png";
import { useSelector, useDispatch } from "react-redux";
import AddEditForm from "../../components/AddEditForm/AddEditForm";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import "./Modal.css";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName , childrenProps } = useSelector((state) => state.modal);
  console.log("🚀 ~ file: Modal.js:12 ~ Modal ~ childrenProps", childrenProps)
 
  const closeModalHandler = () => dispatch(closeModal());

  const componentsLookUp =  {AddEditForm,DeleteConfirm}
  let renderComponent ;
  if(componentName){
  const SelectedComponent = componentsLookUp[componentName]
  if (SelectedComponent) {
    renderComponent = <SelectedComponent {...childrenProps}/>
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
        <div className="modal-content">{renderComponent}</div>
      </div>
    </Fragment>
  );
};

export default Modal;
