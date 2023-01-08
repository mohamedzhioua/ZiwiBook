import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import "./AddEditForm.css";

const AddEditForm = (props) => {
  console.log("🚀 ~ file: AddEditForm.js:7 ~ AddEditForm ~ props", props)
  const [form, setForm] = useState({ title: "", body: "", image: "" });
  const [picture, setPicture] = useState(null);

  //displaying picture after upload handler
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  //clearing the state for the newest user inputs
  const clear = () => {
    setForm({ title: "", body: "", image: "" });
  };

  //onChangeHandler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //onChangefile
  const onChangefile = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.files[0],
    });
  };
  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <div className="Post-list-item">
        <h1 className="New-Post-Title">Share a Memorie</h1>
        <form className="New-Post-Form" onSubmit={onsubmitHandler}>
          <CustomInput
            type="text"
            placeholder="title..."
            label="Title :"
            name="title"
            onChange={onChangeHandler}
            // error={error.title}
            value={form.title}
          />
          <hr />
          <img
            id="output"
            src={picture && picture}
            alt="your_image"
            width="100"
            height="100"
          />
          {/* <hr /> */}
          <CustomInput
            type="file"
            accept="image/gif, image/jpeg, image/png"
            onChange={(e) => {
              onChangePicture(e);
              onChangefile(e);
            }}
            name="image"
          />
          <CustomInput
            label="Description :"
            type="textarea"
            placeholder="content...."
            name="body"
            onChange={onChangeHandler}
            // error={error.body}
            value={form.body}
          />

          <CustomButton
            className="button button8"
            value="submit"
            type="submit"
            disabled={!form.body || !form.title}
          />
        </form>
      </div>
    </>
  );
};

export default AddEditForm;
