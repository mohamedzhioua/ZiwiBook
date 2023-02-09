import { useDispatch } from "react-redux";
// features
import { openModal } from "../../app/features/modal/modalSlice";
//Components
import {CustomButton} from '../index'

const CreatPost = () => {
    const dispatch = useDispatch();

  return (
    <>
     <CustomButton
            className="button2"
            value="add Memorie"
            onClick={() => dispatch(openModal({ name: "AddEditPost" }))}
          />
    </>
  )
}

export default CreatPost