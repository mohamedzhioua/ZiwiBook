import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import  "./AddMemo.css"
function AddMemo() {
  const [form, setForm] = useState({
    title:"",
    body:"",
    image:"",
  });
  const { title, body, image } = form;
  const [picture, setPicture] = useState(null);

  //displaying picture after upload handler
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //onChangeHandler
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
    dispatch(form);
  };

  return (
    <div className="blog-list-item">
      <h1 className="New-Post-Title">Share a Memorie</h1>
      <form className="New-Post-Form" onSubmit={onsubmitHandler}>
        <CustomInput
           type="text"
          placeholder="title..."
          label="Title :"
          name="title"
          onChange={onChangeHandler}
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
            onChangeHandler(e);
          }}
        />
        <CustomInput
        label="Description :"
          type="textarea"
           placeholder="content...."
          name="body"
          onChange={onChangeHandler}
        />

        <CustomButton className="button button8" value="submit" type="submit" />
      </form>
    </div>
  );
}

export default AddMemo;
