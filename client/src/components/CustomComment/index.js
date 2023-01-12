import React, { useState } from "react";
import { useDispatch } from "react-redux";

// features
import { CommentPost } from "../../app/features/memorie/postSlice";

// Components
import {CustomInput ,CustomButton} from "../index";
// Styles
import "./index.css";

const CustomComment = ({ post }) => {
console.log("🚀 ~ file: index.js:13 ~ CustomComment ~ post", post)
const [comments, setComments] = useState(post?.Comments);
const [form, setForm] = useState({comment:''});
 console.log("🚀 ~ file: index.js:15 ~ CustomComment ~ form", form)
 const dispatch = useDispatch()
const id = post?._id
  //onChangeHandler
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
 //onsubmitHandler
 const onsubmitHandler = (event) => {
   event.preventDefault();
  dispatch(CommentPost({id,form}));
};

  return (
    <div className="container">
      <div className="container">
        {comments?.map((e, index) => (
          <div key={index}>
            <p className="comment-p">{e.comment}</p>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <div >
        <CustomInput
          type="textarea"
           float
          label="write a Comment . . . ."
          placeholder="write a Comment . . . ."
          value={form.comment}
          name="comment"
          onChange={onChangeHandler}
          
        />
        <CustomButton type="submit" value="comment" className="commentbtn" disabled={!form.comment} onClick={onsubmitHandler} />
        </div>
      </div>
    </div>
  );
};

export default CustomComment;
