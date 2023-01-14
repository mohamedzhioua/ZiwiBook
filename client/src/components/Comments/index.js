import React from "react";
import { useDispatch, useSelector } from "react-redux";

// features
import { CommentPost} from "../../app/features/memorie/postSlice";

// Components
import Comment from "./Comment";
import CommentForm from "./CommentForm";

// Styles
import "./index.css";

const Comments = ({ post }) => {
  const {comments} = useSelector((state) =>state.post);
const rootComments = comments.filter((comment) => comment.post === post?._id)
// const getReplies = commentID =>{
//   return comments.filter((comment)=>comment._id === commentID).sort((a,b)=>a.replies.createdAt.localeCompare(b.replies.createdAt))
// }
   const dispatch = useDispatch();
  const id = post?._id;



  //onsubmitHandler
  const addComment = (event) => {
    event.preventDefault();
    dispatch(CommentPost({ id }));
  };

  return (
    <>
      <div className="comments">
        <div className="write">
        <img className="comments-img"
            src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
            alt="."
          />
          <CommentForm  submitLabel="write" handleSubmit={addComment}/>
         </div>
        <div className="comments-container">
        {rootComments?.map((rootComment) => (
         <Comment key={rootComment._id} comment={rootComment} replies={[{text:"rrrrrrrrrrrrrrr" , owner:{name:"hama hama",image:"https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"}},{text:"bbbbbbbbbbbb" , owner:{name:"ziwi ziwi",image:"https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"}}]}/>
        ))}
      </div>
      </div>
    </>
  );
};

export default Comments;
