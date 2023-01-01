import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import { addPost, reset , updatePost } from "../../app/features/memorie/postSlice";
import "./AddEditMemo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEditMemo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({title:"" , body:"",image:""});
   const [picture, setPicture] = useState(null);
  const { error, posts, isLoading, message, fulfilled } = useSelector(
    (state) => (state.post)
  );

  //displaying picture after upload handler
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  //clearing the state for the newest user inputs
  const clear = () => {
    setForm({ title: "", body: "", image: "" });
  };

  //handling the memorie old fields for the update
  useEffect(() => {
    if (id) {
      const memorie = posts.find((post) => post._id === id);
      setForm({...memorie});
    }
  }, [id]);

  useEffect(() => {
    message && toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    if (!isLoading && fulfilled) {
      dispatch(reset());
      clear();
    }
  }, [error, message, fulfilled, dispatch, isLoading, navigate]);

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
    var formData = new FormData()
     formData.append('title',form.title)
    formData.append('body',form.body)
     formData.append('image',form.image)
    id ?  dispatch(updatePost({id,formData})) : dispatch(addPost(formData)) 
    clear()
    };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="Post-list-item">
      <h1 className="New-Post-Title">
        {id ? "Update Your Memorie" : "Share a Memorie"}
      </h1>
      <form className="New-Post-Form" onSubmit={onsubmitHandler} >
        <CustomInput
          type="text"
          placeholder="title..."
          label="Title :"
          name="title"
          onChange={onChangeHandler}
          error={error.title}
          value={form.title }
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
          error={error.body}
          value={form.body}
         />

        <CustomButton
          className="button button8"
          value={id ? "update" : "submit"}
          type="submit"
        />
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddEditMemo;
