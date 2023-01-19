import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { CustomInput, CustomButton } from "../index";
// Styles
import "./index.css";

const CommentForm = ({
  submitLabel,
  handleSubmit,
  InitialText = "",
  hasCancelButton = false,
  EditCancelHandler,
}) => {
  const CurrentUserImage = useSelector((state) => state.auth.user.image);
  const [form, setForm] = useState({ text: InitialText });
  const isTextareaDisabled = form.text.length === 0 || form.text === InitialText

  //onChangeHandler
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //onSubmit handler
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(form);
    setForm({ text: "" });
  };

  return (
    <>
    {!(submitLabel === "update") && 
     (<img
        className="comments-img"
        src={CurrentUserImage}
        alt="."
      />)}
      <form onSubmit={onSubmit}>
        <CustomInput
          type="textarea"
          className="commentInput"
          placeholder="write a Comment . . . ."
          name="text"
          value={form.text}
          onChange={onChangeHandler}
        />
        <CustomButton
          type="submit"
          value={submitLabel === "update" ? "update":"Send"}
          className="commentbtn"
          disabled={isTextareaDisabled}
        />
        {hasCancelButton && (
          <CustomButton
          type="submit"
          value="cancel"
          className="commentcancelbtn"
          onClick={EditCancelHandler}
          />
      )}
      </form>
    </>
  );
};

export default CommentForm;
