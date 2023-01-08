import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CustomButton from "../../components/CustomButton/CustomButton";
import "./DeleteConfirm.css";
import { useDispatch } from "react-redux";
import { deleteOne } from "../../app/features/memorie/postSlice";
import { closeModal } from "../../app/features/modal/modalSlice";
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
