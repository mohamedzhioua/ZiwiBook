import React from "react";

// Components
import Comment from "./Comment";

// Styles
import "./index.css";

const Comments = ({ rootComments }) => {
  return rootComments?.map((rootComment) => (
        <div className="comments" key={rootComment._id}>
          <Comment comment={rootComment} />
        </div>
      ))
    }
    
  

export default Comments;
