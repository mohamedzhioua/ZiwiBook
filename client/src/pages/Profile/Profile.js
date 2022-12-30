import React, { useEffect, useState } from "react";
import AddMemo from "../AddMemorie/AddMemo";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import { addPost, reset } from "../../app/features/memorie/postSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { error, isLoading, message, fulfilled } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    title: "",
    body: "",
    image: "",
    userID :user._id
  });
  
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    message && toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    if (!isLoading && fulfilled) {
      dispatch(reset());
      clear()
    }
  }, [user, error, message, fulfilled, dispatch, isLoading, navigate]);
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
    dispatch(addPost(form));
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <AddMemo
        onChangeHandler={onChangeHandler}
        onsubmitHandler={onsubmitHandler}
        error={error}
        onChangefile={onChangefile}
      />
      <ToastContainer />
    </>
  );
}

export default Profile;
