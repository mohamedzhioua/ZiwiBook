import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from '../components/MemorieForm/Form'

function Profile() {
//   const[form,setForm]=useState({})
// const {title,body,image}=form

// const navigate = useNavigate();
// const dispatch = useDispatch();

//     //onChangeHandler
//     const onChangeHandler =(e)=>{
//       const {name,value}= e.target
//           setForm({
//             ...Form,
//             [name]:value
//           })
//         }
      
//          //onsubmitHandler
//          const onsubmitHandler = (event) => {
//           event.preventDefault();
//           dispatch( (form));
//         };
      
  return (
    <>
    <Form />
    </>

  )
}

export default Profile