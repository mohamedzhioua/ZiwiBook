import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
// features
import { openModal } from "../../../../app/features/modal/modalSlice";

//components
import { CustomButton } from "../../../index";

// Styles
import { BsThreeDots } from "react-icons/bs";
import "./index.css";

const PostHead = ({ post, userId }) => {
  const dispatch = useDispatch();
  const canEdit = Boolean(
    userId === post?.owner?._id || userId === post?.owner
  );
  return (
    <div className="post-row">
      <div className="user-profile">
        <Link
          to={`/profile/${post?.owner?.username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img src={post?.owner?.image} className="profile-image" alt="..." />
        </Link>
        <div>
          <Link
            to={`/profile/${post?.owner?.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className="username">{post?.owner?.firstName}</span>
          </Link>
          <span className="date">{moment(post?.createdAt).fromNow()}</span>
        </div>
      </div>
      {canEdit && (
        <CustomButton
          Icon={BsThreeDots}
          onClick={() =>
            dispatch(
              openModal({
                name: "AddEditPost",
                childrenProps: { post: post },
              })
            )
          }
        />
      )}
    </div>
  );
};

export default PostHead;
