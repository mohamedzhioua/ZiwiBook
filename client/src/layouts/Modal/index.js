import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
//features
import { closeModal } from "../../app/features/modal/modalSlice";
//Components
import {AddEditForm} from "../../components/index";
//layouts
import {DeleteConfirm} from "../index";
// Styles
import Close from "../../images/Close.png";
import "./index.css";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName , childrenProps } = useSelector((state) => state.modal);

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
