import React from "react";
import { useDispatch } from "react-redux";

//features
import { useDeletePostMutation } from "../../app/features/post/postSlice";
import { closeModal } from "../../app/features/modal/modalSlice";

//Components
import { CustomButton } from "../../components/index";

//Styles
import "./index.css";
import { toast } from "react-toastify";

const DeleteConfirm = ({ id }) => {
  const dispatch = useDispatch();
  const [deletePost, {isLoading, isSuccess, isError, error }] = useDeletePostMutation();
  if(isSuccess){
    toast.success("Post deleted successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  if(isError){
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
 
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
          onClick={()=>{deletePost(id) ;dispatch(closeModal())}}
        />
      </div>
    </>
  );
};

export default DeleteConfirm;
