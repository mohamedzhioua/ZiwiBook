import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { CustomInput, CustomButton } from "../index";
// Styles
import "./index.css";

const CommentForm = ({
  submitLabel,
  onSubmit,
  InitialText = "",
  hasCancelButton = false,
  EditCancelHandler,
}) => {
  const CurrentUserImage = useSelector((state) => state.auth.user.image);
  const [text, setText] = useState(InitialText);
  const isTextareaDisabled = text.length === 0 || text === InitialText;

  //onSubmit handler
  function onSubmitHandler(event) {
    event.preventDefault();
    onSubmit(text)
    setText("")
  }

  return (
    <>
      {!(submitLabel === "update") && (
        <img className="comments-img" src={CurrentUserImage} alt="." />
      )}
      <form onSubmit={onSubmitHandler}>
        <CustomInput
          type="textarea"
          className="commentInput"
          placeholder="write a Comment . . . ."
          name="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <CustomButton
          type="submit"
          value={submitLabel === "update" ? "update" : "Send"}
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
