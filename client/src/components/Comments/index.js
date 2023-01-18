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
  const CurrentUserId = useSelector((state) => state.auth.user._id);
  const comments = useSelector((state) => state.post.comments).filter(
    (comment) => comment.post === postId
  );
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
    <div className="comments">
      <CommentForm submitLabel="write" handleSubmit={addComment} />
      <div>
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
  );
};

export default Comments;
