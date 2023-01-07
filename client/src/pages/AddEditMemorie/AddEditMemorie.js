// import React, {
//   forwardRef,
//   useEffect,
//   useImperativeHandle,
//   useState,
// } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Loader } from "../../components/Loader/Loader";
// import { useNavigate } from "react-router-dom";
// import CustomButton from "../../components/CustomButton/CustomButton";
// import CustomInput from "../../components/CustomInput/CustomInput";
// import {
//   addPost,
//   reset,
//   updatePost,
// } from "../../app/features/memorie/postSlice";
// import "./AddEditMemo.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AddEditMemo = forwardRef(({post}, ref) => {
//    const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { error, isLoading, message, fulfilled } = useSelector(
//     (state) => state.post
//   );
//   // const Memorie = useSelector((state) => state.post.post);
//   const id = form._id || null;



  
//   useImperativeHandle(ref, () => ({
//     getAlert() {
//       clear();
//     },
//   }));
//   //handling the memorie old fields for the update
//   useEffect(() => {
//     if (post) setForm({ ...post });
//   }, [post]);

//   useEffect(() => {
//     message && toast.success(message, { position: toast.POSITION.TOP_RIGHT });
//     if ((!isLoading && fulfilled) || (!isLoading && fulfilled && id)) {
//       dispatch(reset());
//     }
//   }, [id, error, message, fulfilled, dispatch, isLoading, navigate]);


//   //onsubmitHandler
//   const onsubmitHandler = (event) => {
//     event.preventDefault();
//     if (id) {
//       dispatch(updatePost({ id, form }));
//     } else {
//       dispatch(addPost(form));
//     }
//     clear();
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <div class="modal-body">
//         <div className="Post-list-item">
//           <h1 className="New-Post-Title">
//             {id ? "Update Your Memorie" : "Share a Memorie"}
//           </h1>
//           <form className="New-Post-Form" onSubmit={onsubmitHandler}>
//             <CustomInput
//               type="text"
//               placeholder="title..."
//               label="Title :"
//               name="title"
//               onChange={onChangeHandler}
//               error={error.title}
//               value={form.title}
//             />
//             <hr />
//             <img
//               id="output"
//               src={picture && picture}
//               alt="your_image"
//               width="100"
//               height="100"
//             />
//             {/* <hr /> */}
//             <CustomInput
//               type="file"
//               accept="image/gif, image/jpeg, image/png"
//               onChange={(e) => {
//                 onChangePicture(e);
//                 onChangefile(e);
//               }}
//               name="image"
//             />
//             <CustomInput
//               label="Description :"
//               type="textarea"
//               placeholder="content...."
//               name="body"
//               onChange={onChangeHandler}
//               error={error.body}
//               value={form.body}
//             />

//             <CustomButton
//               className="button button8"
//               value={id ? "update" : "submit"}
//               type="submit"
//               disabled={!form.body || !form.title}
//             />
//           </form>
//           <ToastContainer />
//         </div>
//       </div>
//     </>
//   );
// });

// export default AddEditMemo;