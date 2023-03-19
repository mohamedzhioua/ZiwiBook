import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { openModal } from "../../../../app/features/modal/modalSlice";
import style from "./postHead.module.css";
import { Dots } from "../../../../assets/svg";

const PostHead = ({ post , isVisitor}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const canEdit = Boolean(
    user?._id === post?.owner?._id || user?._id === post?.owner
  );
  return (
    <div className={style.post_row}>
      <div className={style.user_profile}>
        <div className={style.left}>
          <Link
            to={`/profile/${post?.owner?.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
          {isVisitor  ? (
          <img src={post?.owner?.photo} alt="..." />
          ):(
            <img src={user?.photo} alt="..." />

          )}
          </Link>
        </div>
        <div>
          <Link
            to={`/profile/${post?.owner?.username}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span className={style.username}>{post?.owner?.firstName}</span>
          </Link>
          <span className={style.date}>
            {moment(post?.createdAt).fromNow()}
          </span>
        </div>
      </div>
      {canEdit && (
        <div
          className={`${style.dots} hover1`}
          onClick={() =>
            dispatch(
              openModal({
                name: "AddEditPost",
                childrenProps: { post: post, user: user },
              })
            )
          }
        >
          <Dots color="#828387" />
        </div>
      )}
    </div>
  );
};

export default PostHead;
