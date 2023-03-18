import React from "react";

// Components
import Comment from "./Comment";

 
import Styles from "./comment.module.css";

const Comments = ({ rootComments }) => {
  
  return rootComments?.map((rootComment) => (
        <div className={Styles.comments} key={rootComment._id}>
          <Comment comment={rootComment} />
        </div>
      ))
    }
    
  

export default Comments;
