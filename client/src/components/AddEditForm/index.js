import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// features
import { addPost, updatePost } from "../../app/features/post/postSlice";

// Components
import { CustomInput, CustomButton } from "../index";

// Styles
import "./index.css";
import { toast } from "react-toastify";

const AddEditForm = ({ post }) => {
  const [form, setForm] = useState({ text: "", image: "" });
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();
  // post id
  const id = form._id || null;

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
    setForm({
      ...form,
      [e.target.name]: e.target.files[0],
    });
  };

  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
    if (Boolean(post)) {
      dispatch(updatePost({ id, form }))
        .unwrap()
        .then((data) => {
          toast.success("Post updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(addPost(form))
        .unwrap()
        .then((data) => {
          toast.success("Post added successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    clear();
  };
  return (
    <>
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
            accept="image/gif, image/jpeg, image/png"
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
            disabled={!form.text}
          />
        </form>
      </div>
    </>
  );
};

export default AddEditForm;
