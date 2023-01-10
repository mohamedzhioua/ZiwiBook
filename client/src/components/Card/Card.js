import React from "react";
import "./Card.css";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/features/modal/modalSlice";
import { likePost } from "../../app/features/memorie/postSlice";
import CustomLikes from "../CustomLike/CustomLike";
import CustomComment from "../CustomComment/CustomComment";
import CustomPostHead from "../CustomPostHead/CustomPostHead";
const Card = ({ post, userId }) => {
  console.log("🚀 ~ file: Card.js:11 ~ Card ~ userId", userId);
  console.log("🚀 ~ file: Card.js:11 ~ Card ~ post", post);
  const dispatch = useDispatch();
  const LIKES = post?.likes;

  return (
    <div className="card h-100">
      <CustomPostHead post={post} userId={userId} />
      <img src={post.image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{post.title}</h5>
        <p class="card-text">{post.body.substring(0, 20)}</p>
      </div>
      <hr />
      <div class="container">
        <div class="row" style={{ padding: "10px" }}>
          <div
            class="col col-md-6 col-lg-4 d-flex justify-content-start"
            onClick={() => dispatch(likePost(post._id))}
          >
            <CustomLikes userId={userId} LIKES={LIKES} />
          </div>
          <div class="col col-md-6 col-lg-4 d-flex justify-content-center">
            <CustomComment />
          </div>
          {userId === post.user._id && (
            <>
              <div
                class="col col-md-6 col-lg-4 d-flex justify-content-end"
                onClick={() => {
                  dispatch(
                    openModal({
                      name: "DeleteConfirm",
                      childrenProps: { id: post._id },
                    })
                  );
                }}
              >
                <AiOutlineDelete className="card-icon" /> &nbsp;Delete
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
