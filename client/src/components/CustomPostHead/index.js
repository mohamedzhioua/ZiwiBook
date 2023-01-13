import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
// features
import { openModal } from "../../app/features/modal/modalSlice";

// Styles
import { BsThreeDots } from "react-icons/bs";
import "./index.css";

const CustomPostHead = ({ post, userId }) => {
  const dispatch = useDispatch();

  return (
    <div className="container" style={{ padding: "10px" }}>
      <div class="row">
        <div className="col col-sm d-flex justify-content-start">
          <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
            <img src={post.owner.image} className="profile-img" alt="..." />
          </Link>
          <div className="details">
            <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="name">{post.owner.name}</span>
            </Link>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        {userId === post.owner._id && (
          <div className="col col-sm d-flex justify-content-end">
            <BsThreeDots
              className="CustomPostHead-icon"
              onClick={() =>
                dispatch(
                  openModal({
                    name: "AddEditForm",
                    childrenProps: { post: post },
                  })
                )
              }
            ></BsThreeDots>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomPostHead;
