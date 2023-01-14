import React, { useState } from 'react'
 // Components
import { CustomInput, CustomButton } from "../index";

const CommentForm = ({submitLabel,handleSubmit}) => {
  const [text,setText]=useState("");
const onSubmit=(e)=>{
  e.preventDefault();
  handleSubmit(text)
}
  return (
<form onSubmit={onSubmit}>
    <CustomInput
    type="textarea"
    className="commentInput"
    placeholder="write a Comment . . . ."
    name="text"
    value={text}
    onChange={(e)=>setText(e.target.value)}
  />
  <CustomButton
    type="submit"
    value="Send"
    className="commentbtn"
    disabled={!text}
  /> 
  </form>
   )
}

export default CommentForm