import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
// features
import { openModal } from "../../app/features/modal/modalSlice";

// Styles
import { BsThreeDots } from "react-icons/bs";
import "./index.css";

const PostHead = ({ post, userId }) => {
  const dispatch = useDispatch();

  return (
    <div className="post-row">
      <div className="user-profile">
        <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
          <img src={post.owner.image} className="profile-image" alt="..." />
        </Link>
        <div>
          <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
            <span className="username">{post.owner.name}</span>
          </Link>
          <span className="date">{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>
      {userId === post.owner._id && (
        <BsThreeDots
          className="PostHead-icon"
          onClick={() =>
            dispatch(
              openModal({
                name: "AddEditForm",
                childrenProps: { post: post },
              })
            )
          }
        ></BsThreeDots>
      )}
    </div>
  );
};

export default PostHead;
