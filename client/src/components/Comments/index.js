import React from "react";
import { useDispatch, useSelector } from "react-redux";

// features
import { AddComment } from "../../app/features/post/postSlice";

// Components
import Comment from "./Comment";
import CommentForm from "./CommentForm";

// Styles
import "./index.css";

const Comments = ({ postId }) => {
  console.log("🚀 ~ file: index.js:15 ~ Comments ~ postId", postId)
  const CurrentUserId = useSelector((state) => state.auth.user._id);
  const  comments  = useSelector((state) => state.post.comments).filter((comment)=>comment.post === postId)
  console.log("🚀 ~ file: index.js:18 ~ Comments ~ comments", comments)
  const dispatch = useDispatch();


  // root comments
  const rootComments = comments
    .filter((comment) => comment.parentId === null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // replies
  const getReplies = (commentID) => {
    return comments
      .filter((comment) => comment.parentId === commentID)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  };

  //onsubmitHandler
  const addComment = (text) => {
    dispatch(AddComment({ postId, text }));
  };

  return (
    <>
      <div className="comments">
        <div className="write">
          <CommentForm submitLabel="write" handleSubmit={addComment} />
        </div>
        <div className="comments-container">
          {rootComments?.map((rootComment) => (
            <Comment
              key={rootComment._id}
              comment={rootComment}
              CurrentUserId={CurrentUserId}
              replies={getReplies(rootComment._id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
