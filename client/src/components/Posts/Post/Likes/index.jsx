import React from "react";
import reactionStyle from "./react.module.css";
import chekedlike from "../../../../assets/svg/like.svg";

const Likes = ({ Reactions, userId }) => {
  if (Reactions?.length > 0) {  

    return Reactions?.find((reaction) => reaction.owner === userId) ? (
      
      <>
        <img src={chekedlike} alt="" style={{ width: "18px" }} />
        {/* &nbsp; */}
        <span className={reactionStyle.react_span}>
          {Reactions.length > 2
            ? `You and ${Reactions?.length - 1} others`
            : `${Reactions?.length} like${Reactions?.length > 1 ? "s" : ""}`}
        </span>
      </>
    ) : (
      <>
        <img src={chekedlike} alt="" style={{ width: "18px" }} />
        <span className={reactionStyle.react_span}>
          {Reactions?.length} {Reactions?.length === 1 ? "Like" : "Likes"}
        </span>
      </>
    );
  }
};

export default Likes;
