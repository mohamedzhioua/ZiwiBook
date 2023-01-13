import React, { useState } from "react";
import { useDispatch } from "react-redux";

// features
import { CommentPost } from "../../app/features/memorie/postSlice";

// Components
import {CustomInput ,CustomButton} from "../index";
// Styles
import "./index.css";

const Comments = ({ post }) => {
const [comment, setComment] = useState(["oohhhhhhhhhhhhhhh","ggggggggggggggggg"]);
const [form, setForm] = useState({comment:''});
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
    < >
       
      <div className="comments">
      <div className="write">
      <img src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt="." />
 
        <CustomInput
          type="text"
          className="commentInput"
          placeholder="write a Comment . . . ."
          value={form.comment}
          name="comment"
          onChange={onChangeHandler}
        />
        <CustomButton type="submit" value="Send" className="commentbtn" disabled={!form.comment} onClick={onsubmitHandler} />
  
      </div>
        {comment?.map((e, index) => (
          <div className="comment" key={index}>    
          <img src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg" alt="." />
       <div className="info">
        <span>ziwi hama</span>
        <p>{e}</p>
       </div>
           <span className="date">1 hour ago</span> 
          </div>
        ))}
      </div>
     
    </>
  );
};

export default Comments;
