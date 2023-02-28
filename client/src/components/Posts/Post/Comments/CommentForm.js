import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { CustomInput, CustomButton } from "../../../index";
// Styles
import "./index.css";

const CommentForm = ({
  submitLabel,
  onSubmit,
  InitialText = "",
  hasCancelButton = false,
  EditCancelHandler,
  autoFocus = false,
}) => {
  const CurrentUserImage = useSelector((state) => state.auth.user.image);
  const [text, setText] = useState(InitialText);
  const isTextareaDisabled = text.length === 0 || text === InitialText;

  //onSubmit handler
  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit(text);
    setText("");
  }
  return (
    <div>
      {!(submitLabel === "update") && (
        <img className="comments-img" src={CurrentUserImage} alt="." />
      )}
      <form onSubmit={handleSubmit}>
        <CustomInput
          autoFocus={autoFocus}
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
    </div>
  );
};

export default CommentForm;
