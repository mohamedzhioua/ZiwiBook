import React from "react";
import IconStyle from "../../../../styles/icons.module.css";
import style from "./react.module.css";
const Likes = ({ LIKES, userId }) => {
  if (LIKES?.length > 0) {
    return LIKES?.find((like) => like === userId) ? (
      <>
        <i className={IconStyle.like_icon} />
        {/* &nbsp; */}
        <span className={style.react_span}>
          {LIKES.length > 2
            ? `You and ${LIKES?.length - 1} others`
            : `${LIKES?.length} like${LIKES?.length > 1 ? "s" : ""}`}
        </span>
      </>
    ) : (
      <>
        <i className={IconStyle.like_icon} /> 
        <span className={style.react_span}>
          {LIKES?.length} {LIKES?.length === 1 ? "Like" : "Likes"}
        </span>
      </>
    );
  }

  return (
    <>
      <i className={IconStyle.like_icon}/> 
      <span className={style.react_span}>Like</span>
    </>
  );
};

export default Likes;
