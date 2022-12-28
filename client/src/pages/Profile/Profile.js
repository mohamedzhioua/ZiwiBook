import React, { useState } from "react";
import AddMemo from "../AddMemorie/AddMemo";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import { addPost } from "../../app/features/memorie/postSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { error, isLoading, message } = useSelector((state) => state.post);
   const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    body: "",
    image:"" ,
    userID: user._id,
  });
  console.log("🚀 ~ file: Profile.js:18 ~ Profile ~ form", form)
  const { title, body, image, userID } = form;


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
   //onChangefile
   const onChangefile = (e) => {
     setForm({
      ...form,
      [e.target.name]:  e.target.files[0],
    });
  };

  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
    dispatch(addPost(form));
  };
  console.log(form);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <AddMemo
        onChangeHandler={onChangeHandler}
        onsubmitHandler={onsubmitHandler}
        error={error}
        onChangefile={onChangefile}
      />
    </div>
  );
}

export default Profile;
