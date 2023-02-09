import React, { useState } from "react";
import { useSelector } from "react-redux";
// Components
import { CustomInput, CustomButton, FormLoader } from "../../../index";
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
  const { status } = useSelector((state) => state.posts);
  const CurrentUserImage = useSelector((state) => state.auth.user.image);
  const [text, setText] = useState(InitialText);
  const isTextareaDisabled = text.length === 0 || text === InitialText;

  //onSubmit handler
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(text);
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
        {Boolean(status === "Loading") ? (
          <FormLoader loading={status} />
        ) : (
          <>
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
          </>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
