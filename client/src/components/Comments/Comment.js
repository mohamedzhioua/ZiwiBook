import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//components
import CommentForm from "./CommentForm";
import {CustomButton, CustomLikes} from "../index";

// Styles
import "./index.css";
import { addCommentReply, deleteComment, updateComment } from "../../app/features/post/postSlice";
import { BsTrash } from "react-icons/bs";
import { FaReply , FaEdit} from "react-icons/fa";


const Comment = ({ comment,replies,CurrentUserId  }) => {

  const [activeComment,setActiveComment]=useState(null)
   const dispatch = useDispatch();
  const id = activeComment?.id
 
  // checking if the user is allowed to Reply, Edit or Delete 
  const canReply = Boolean(CurrentUserId);
  const canEdit = CurrentUserId === comment?.owner?._id ; 
  const canDelete = CurrentUserId === comment?.owner?._id ;

  // conditions to know what exactly the User willing to do 
  const isReplying = activeComment && activeComment.type ==="replying" && activeComment.id === comment._id ;
  const isEditing = activeComment && activeComment.type ==="editing" && activeComment.id === comment._id ;

  //comment old text field 
  const InitialText = useSelector((state)=>state.post.comments.find(comment=>comment._id ===id))

  //onsubmitHandler
  const addComment = (text) => {
  if (activeComment.type === "replying" ) {
     dispatch(addCommentReply({id, text }));
     setActiveComment(null)
   } else{
    dispatch(updateComment({id,text}) )
    setActiveComment(null)
   }
  };

  //handle Editing cancel 
  const EditCancelHandler = () => setActiveComment(null)

  return (
    <div className="comment">
       <div className="comment-header">
        <div>
       <img className="comment-image" src={comment?.owner?.image} alt="." />
           <span className="author">{comment?.owner?.name}</span>
           </div>
          <span className="date">{moment(comment?.createdAt).fromNow()}</span>
       </div>
        {!isEditing && <div className="comment-text">{comment?.text}</div>}
       {isEditing && (
        <CommentForm  submitLabel="update"  handleSubmit={addComment} hasCancelButton EditCancelHandler={EditCancelHandler} InitialText={InitialText.text} />
       )}
        <div className="comment-actions">
          <CustomLikes/>
         {!isEditing && (<>{canReply && <CustomButton Icon={FaReply} onClick={()=>setActiveComment({id:comment?._id ,type:"replying"})}/>}
          {canEdit && <CustomButton Icon={FaEdit} onClick={()=>setActiveComment({id:comment?._id,type:"editing"})}/>}
          {canDelete && <CustomButton Icon={BsTrash} onClick={()=>dispatch(deleteComment(comment?._id ))}/>}</>)}
          {isReplying && (
            <CommentForm 
            submitLabel="Reply"
            handleSubmit={addComment}/>
          )}
        </div>

        {replies?.length > 0 && (
          <div className="replies">
            {replies?.map((reply) => (
              <Comment comment={reply} key={reply._id} replies={[]} CurrentUserId={CurrentUserId} />
            ))}
          </div>
        )}
      </div>
   
  );
};

export default Comment;
