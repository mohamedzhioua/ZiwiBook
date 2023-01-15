import React from "react";
import moment from "moment";
// Styles
import "./index.css";

const Comment = ({ comment, replies }) => {
  return (
    <div className="comment">
      <img className="comment-image" src={comment?.owner?.image} alt="." />
      <div className="comment-body">
        <div className="info">
          <span className="comment-author">{comment?.owner?.name}</span>
          <span className="date">{moment(comment?.createdAt).fromNow()}</span>
        </div>
        <p className="comment-text">{comment?.text}</p>
        <div className="replies">
          {replies.map((reply, i) => (
            <Comment comment={reply} key={i} replies={[]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
