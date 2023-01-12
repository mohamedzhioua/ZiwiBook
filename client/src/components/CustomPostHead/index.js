import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

// features
import { openModal } from "../../app/features/modal/modalSlice";

// Styles
import { BsThreeDots } from "react-icons/bs";
import "./index.css";

const CustomPostHead = ({ post, userId }) => {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div class="row">
        <div className="col col-sm d-flex justify-content-start">
          <img src={post.PostedBy.image} className="profile-img" alt="..." />
          &nbsp;
          <div>
            <div class="row">&nbsp;{post.PostedBy.name}&nbsp;</div>
            <div class="row">
              <p className="moment">{moment(post.createdAt).fromNow()}</p>
            </div>
          </div>
        </div>
         {userId === post.PostedBy._id && (
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
