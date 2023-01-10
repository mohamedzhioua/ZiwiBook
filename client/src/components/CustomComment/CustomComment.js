import React, { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import "./CustomComment.css";
const CustomComment = () => {
  const [comments, setComments] = useState([1, 2, 3, 4]);
  return (
    <div className="container">
      <div className="container">
        {comments.map((comment, index) => (
          <div>
            <p className="comment-p" key={index}>
              comment{index}
            </p>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <CustomInput type="textarea" float label="write a Comment" plaCeholder="write a Comment"/>
      </div>
    </div>
  );
};

export default CustomComment;
