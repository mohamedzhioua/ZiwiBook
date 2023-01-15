import React, { useState } from "react";
import { useDispatch } from "react-redux";

// features
import { openModal } from "../../app/features/modal/modalSlice";
import { likePost } from "../../app/features/post/postSlice";

// Components
import { Comments, CustomPostHead, CustomLikes } from "../index";

// Styles
import { GoComment } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import "./index.css";

const Card = ({ post, userId }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const dispatch = useDispatch();
  const LIKES = post?.likes;

  return (
    <div className="card h-100">
      <CustomPostHead post={post} userId={userId} />
      <div className="card-body">
        <p className="card-text">{post.text.substring(0, 20)}</p>
      </div>
      {post?.image && (
        <img src={post.image} className="card-img-top" alt="..." />
      )}
      <div className="container">
        <div className="row" style={{ padding: "10px" }}>
          <hr />
          <div
            className="col col-sm d-flex justify-content-start"
            onClick={() => dispatch(likePost(post._id))}
          >
            <CustomLikes userId={userId} LIKES={LIKES} />
          </div>
          <div
            className="col col-sm d-flex justify-content-center"
            onClick={() => setCommentOpen(!commentOpen)}
          >
            <GoComment className="card-icon" />
            &nbsp;Comment
          </div>
          {userId === post.owner._id && (
            <>
              <div
                className="col col-sm d-flex justify-content-end"
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
         {commentOpen && <Comments post={post} />}
        
      </div>
    </div>
  );
};

export default Card;
