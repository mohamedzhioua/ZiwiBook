import React, { useState } from "react";
// Components
import { CustomInput, CustomButton } from "../index";
// Styles
import "./index.css";

const CommentForm = ({ submitLabel, handleSubmit ,oldText="" }) => {
  const [form, setForm] = useState({ text:oldText});

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
      <img
        className="comments-img"
        src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
        alt="."
      />
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
          value="Send"
          className="commentbtn"
          disabled={!form.text}
        />
      </form>
    </>
  );
};

export default CommentForm;
