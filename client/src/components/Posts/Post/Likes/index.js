import React from "react";
import reactionStyle from "./react.module.css";
import chekedlike from "../../../../svg/like.svg";

const Likes = ({ LIKES, userId }) => {
  if (LIKES?.length > 0) {
    return LIKES?.find((like) => like === userId) ? (
      <>
        <img src={chekedlike} alt="" style={{ width: "18px" }} />
        {/* &nbsp; */}
        <span className={reactionStyle.react_span}>
          {LIKES.length > 2
            ? `You and ${LIKES?.length - 1} others`
            : `${LIKES?.length} like${LIKES?.length > 1 ? "s" : ""}`}
        </span>
      </>
    ) : (
      <>
        <img src={chekedlike} alt="" style={{ width: "18px" }} />
        <span className={reactionStyle.react_span}>
          {LIKES?.length} {LIKES?.length === 1 ? "Like" : "Likes"}
        </span>
      </>
    );
  }
};

export default Likes;
