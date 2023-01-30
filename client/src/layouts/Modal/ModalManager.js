import { useSelector, useDispatch } from "react-redux";
//features
import { closeModal } from "../../app/features/modal/modalSlice";
//Components
import { AddEditPost } from "../../components/index";
//layouts
import { DeleteConfirm, Modal } from "../index";

const ModalManager = () => {
  const dispatch = useDispatch();
  const { isOpen, componentName, childrenProps } = useSelector(
    (state) => state.modal
  );

  const closeModalHandler = () => dispatch(closeModal());

  const componentsLookUp = { AddEditPost, DeleteConfirm };
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
