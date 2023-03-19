import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../app/features/modal/modalSlice";
import { AddEditPost, RegisterForm } from "../../components/index";
import { DeleteConfirm, Modal } from "../index";

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName, childrenProps } = useSelector(
    (state) => state.modal
  );

  const closeModalHandler = () => dispatch(closeModal());

  const componentsLookUp = { AddEditPost, DeleteConfirm, RegisterForm };
  let renderComponent;
  if (componentName) {
    const SelectedComponent = componentsLookUp[componentName];
    if (SelectedComponent) {
      renderComponent = <SelectedComponent {...childrenProps} />;
    }
  }
  return (
    <Modal isOpen={isOpen} closeModalHandler={closeModalHandler}>
      {renderComponent}
    </Modal>
  );
};

export default ModalManager;
