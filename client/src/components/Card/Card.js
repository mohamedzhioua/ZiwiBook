import React from "react";
import "./Card.css";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/features/modal/modalSlice";
import { likePost } from "../../app/features/memorie/postSlice";
const Card = ({ post, userId }) => {
  const dispatch = useDispatch();
  const LIKES = post?.likes;

  const Likes = () => {
    if (LIKES.length > 0) {
      return LIKES.find((like) => like === userId) ? (
        <>
          <AiFillLike className="card-icon" />
          &nbsp;
          {LIKES.length > 2
            ? `You and ${LIKES.length - 1} others`
            : `${LIKES.length} like${LIKES.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <AiOutlineLike className="card-icon" />
          &nbsp;{LIKES.length} {LIKES.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <AiOutlineLike className="card-icon" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div class="card h-100">
      {userId === post.user && (
        <div className="d-flex justify-content-end">
          {userId === post.user && (
            <BsThreeDots
              className="card-icon"
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
      )}
      <img src={post.image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{post.title}</h5>
        <p class="card-text">{post.body.substring(0, 20)}</p>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>

      <div class="row" style={{ padding: "10px" }}>
        <div
          class="col d-flex justify-content-start"
          onClick={() => dispatch(likePost(post._id))}
        >
          <Likes />
        </div>
        {userId === post.user && (
          <>
            <div
              class="col d-flex justify-content-end"
              onClick={() => {
                dispatch(
                  openModal({
                    name: "DeleteConfirm",
                    childrenProps: { id: post._id },
                  })
                );
              }}
            >
              <MdDelete className="card-icon" /> Delete
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
