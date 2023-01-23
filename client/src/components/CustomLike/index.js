import React from "react";
// Styles
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { CustomButton } from "../index";

const CustomLikes = ({ LIKES, userId }) => {
  if (LIKES?.length > 0) {
    return LIKES?.find((like) => like === userId) ? (
      
      <CustomButton Icon={AiFillLike}>
       &nbsp;{LIKES.length > 2
          ? `You and ${LIKES?.length - 1} others`
          : `${LIKES?.length} like${LIKES?.length > 1 ? "s" : ""}`}
      </CustomButton>

    ) : (

      <CustomButton Icon={AiOutlineLike}>
        &nbsp;{LIKES?.length} {LIKES?.length === 1 ? "Like" : "Likes"}
      </CustomButton>
      
    );
  }

  return <CustomButton Icon={AiOutlineLike}>&nbsp;Like</CustomButton>;
};

export default CustomLikes;
