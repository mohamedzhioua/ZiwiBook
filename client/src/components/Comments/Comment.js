import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
// Styles
import "./index.css";
import { deleteComment } from "../../app/features/post/postSlice";

const Comment = ({ comment, replies, CurrentUserId , activeComment , setActiveComment }) => {
  const dispatch = useDispatch();
  const canReply = Boolean(CurrentUserId);
  const canEdit = CurrentUserId === comment?.owner?._id;
  const canDelete = CurrentUserId === comment?.owner?._id;
const CommentId = comment?._id ; 
  return (
    <div className="comment">
      <img className="comment-image" src={comment?.owner?.image} alt="." />
      <div className="comment-body">
        <div className="comment-info">
          <span className="comment-author">{comment?.owner?.name}</span>
          <span className="date">{moment(comment?.createdAt).fromNow()}</span>
        </div>
        <p className="comment-text">{comment?.text}</p>
        <div className="comment-actions">
          {canReply && <div className="comment-action"onClick={()=>setActiveComment({id:CommentId,type:"replying"})}>Reply</div>}
          {canEdit && <div className="comment-action" onClick={()=>setActiveComment({id:CommentId,type:"editing"})}>Edit</div>}
          {canDelete && <div className="comment-action" onClick={()=>dispatch(deleteComment(CommentId))}>Delete</div>}
        </div>

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply, i) => (
              <Comment comment={reply} key={i} replies={[]} CurrentUserId={CurrentUserId}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
