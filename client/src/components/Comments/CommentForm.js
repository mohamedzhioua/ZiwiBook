import React, { useState } from "react";
// Components
import { CustomInput, CustomButton } from "../index";

const CommentForm = ({ submitLabel, handleSubmit }) => {
  const [form, setForm] = useState({ text: "" });


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
  );
};

export default CommentForm;
