import React from "react";
import { useDispatch } from "react-redux";

//features
import { deleteOne } from "../../app/features/memorie/postSlice";
import { closeModal } from "../../app/features/modal/modalSlice";

//Components
import {CustomButton} from "../../components/index"

//Styles
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./index.css";

const DeleteConfirm = ({id}) => {

 const dispatch = useDispatch();

  return (
    <div className="container text-center">
      <div className="icon-box">
        <AiOutlineCloseCircle className="closeicon" />
      </div>
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
          onClick={() =>{ dispatch(deleteOne(id)); dispatch(closeModal())} }
        />
      </div>
    </div>
  );
};

export default DeleteConfirm;
