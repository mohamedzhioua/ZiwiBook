import React, { useEffect, useState } from "react";

// features
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
} from "../../../app/features/post/postSlice";

// Components
import { CustomInput, CustomButton, FormLoader } from "../../index";

// Styles
import "./index.css";
import { toast } from "react-toastify";
import { closeModal } from "../../../app/features/modal/modalSlice";
import { useDispatch } from "react-redux";

const AddEditPost = ({ post }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ text: "", image: "" });
  const [error, setError] = useState(null);
  const [picture, setPicture] = useState(null);
  // post id
  const id = form._id || null;
  const [addNewPost, { isLoading, isError, isSuccess }] =useAddNewPostMutation();
  const [ updatePost, { isLoading: updateIsLoading, isError:updateError, isSuccess: updateIsSuccess }] = useUpdatePostMutation();

  useEffect(() => {
    if(isError ||updateError ){
      setError("something went wrong")
    }

    if (isSuccess || updateIsSuccess) {
      clear();
      dispatch(closeModal());
    }
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
    });
  }, [isSuccess, updateIsSuccess,isError,updateError,error,dispatch]);

  //displaying picture after upload handler
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  //handling the memorie old fields for the update
  useEffect(() => {
    if (post) setForm({ ...post });
  }, [post]);

  //clearing the state for the newest user inputs
  const clear = () => {
    setForm({ text: "", image: "" });
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
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    }
    setForm({
      ...form,
      [e.target.name]: file,
    });
    setError(null);
  };

  //onsubmitHandler
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    let dataForm = new FormData();
    dataForm.append("text", form.text);
    dataForm.append("image", form.image);
    if (Boolean(post)) {
      await updatePost({ id, dataForm });
    } else {
      await addNewPost(dataForm);
    }
  };
  return (
    <FormLoader loading={updateIsLoading || isLoading}>
      <div className="Post-list-item">
        <h1 className="New-Post-Title">
          {post ? "Update your " : "Share a "}Memorie
        </h1>
        <form className="New-Post-Form" onSubmit={onsubmitHandler}>
          <CustomInput
            label="Description :"
            type="textarea"
            placeholder="content...."
            name="text"
            onChange={onChangeHandler}
            value={form.text}
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
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => {
              onChangePicture(e);
              onChangefile(e);
            }}
            name="image"
          />

          <CustomButton
            className="button button8"
            value={post ? "update" : "submit"}
            type="submit"
            disabled={!form.text || error}
          />
        </form>
      </div>
    </FormLoader>
  );
};

export default AddEditPost;
