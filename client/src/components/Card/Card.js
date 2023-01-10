import React, { useState } from "react";
import "./Card.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/features/modal/modalSlice";
import { likePost } from "../../app/features/memorie/postSlice";
import CustomLikes from "../CustomLike/CustomLike";
import { GoComment } from "react-icons/go";
import CustomPostHead from "../CustomPostHead/CustomPostHead";
import CustomComment from "../CustomComment/CustomComment";
const Card = ({ post, userId }) => {
const [show , setShow]=useState(false)
const showComment=()=>{
  !show? setShow(true) : setShow(false)
}
  const dispatch = useDispatch();
  const LIKES = post?.likes;

  return (
    <div className="card h-100">
      <CustomPostHead post={post} userId={userId} />
      <img src={post.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body.substring(0, 20)}</p>
      </div>
      <div className="container">
        <div className="row" style={{ padding: "10px" }}>
          <hr />
          <div
            className="col col-sm d-flex justify-content-start"
            onClick={() => dispatch(likePost(post._id))}
          >
            <CustomLikes userId={userId} LIKES={LIKES} />
          </div>
          <div className="col col-sm d-flex justify-content-center" onClick={()=>showComment()}>
            <GoComment className="card-icon" />
            &nbsp;Comment
          </div>
          {userId === post.user._id && (
            <>
              <div className="col col-sm d-flex justify-content-end"
                onClick={() => {
                  dispatch(
                    openModal({
                      name: "DeleteConfirm",
                      childrenProps: { id: post._id },
                    })
                  );
                }}
              >
                <AiOutlineDelete classNameName="card-icon" /> &nbsp;Delete
              </div>
            </>
          )}
        </div>
       {show && <CustomComment post ={post}/>}
      </div>
    </div>
  );
};

export default Card;
