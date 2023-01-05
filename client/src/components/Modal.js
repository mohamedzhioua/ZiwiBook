import React, { useRef } from "react";
import CustomButton from "./CustomButton/CustomButton";
import { HiDotsHorizontal } from "react-icons/hi";
import AddEditMemo from "../pages/AddEditMemorie/AddEditMemorie";
import { reset } from "../app/features/memorie/postSlice";
import { useDispatch } from "react-redux";

const Modal = ({ EDIT }) => {
  const dispatch = useDispatch();
  const ref = useRef();
   return (
    <>
      {!EDIT ? (
        <CustomButton
          value="add Memorie"
          className="button2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        />
      ) : (
        <HiDotsHorizontal
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        />
      )}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  dispatch(reset());
                  ref.current.getAlert()
                }}
              ></button>
            </div>
            <AddEditMemo ref={ref}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
