import React from "react";
import { useDispatch } from "react-redux";

//features
import { deleteOne } from "../../app/features/post/postSlice";
import { closeModal } from "../../app/features/modal/modalSlice";

//Components
import { CustomButton } from "../../components/index";

//Styles
import "./index.css";
import { toast } from "react-toastify";

const DeleteConfirm = ({ id }) => {
  const dispatch = useDispatch();

  return (
    <>
      <h4 class="title">Are you sure?</h4>

      <div class="body">
        <p>
          Do you really want to delete these memorie? This process cannot be
          undone.
        </p>
      </div>
      <div className="button-box">
        <CustomButton
          className="cancelbtn"
          value="Cancel"
          onClick={() => dispatch(closeModal())}
        />
        <CustomButton
          className="deletebtn"
          value="delete"
          onClick={() => {
            dispatch(deleteOne(id))
            .unwrap()
            .then((data) => {
              toast.success("Post deleted successfully", {
                position: toast.POSITION.TOP_RIGHT,
              });
            })
            .catch((error) => {
              console.log(error);
            });
          }}
        />
      </div>
    </>
  );
};

export default DeleteConfirm;
