import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// features
// import { addPost, updatePost } from "../../../app/features/post/postSlice";

// Components
import { CustomInput, CustomButton } from "../../index";

// Styles
import "./index.css";
import { toast } from "react-toastify";

const AddEditPost = ({ post }) => {
  const [form, setForm] = useState({ text: "", image: "" });
  const [error, setError] = useState(null);

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
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      setError(`${file.name} format is not supported.`);
      toast.error(`${file.name} format is not supported.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setForm({
      ...form,
      [e.target.name]: file,
    });
    setError(null);
  };

  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
    // if (Boolean(post)) {
    //   dispatch(updatePost({ id, form }))
    //     .unwrap()
    //     .then((data) => {
    //       toast.success("Post updated successfully", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   dispatch(addPost(form))
    //     .unwrap()
    //     .then((data) => {
    //       toast.success("Post added successfully", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    // clear();
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
    </>
  );
};

export default AddEditPost;
