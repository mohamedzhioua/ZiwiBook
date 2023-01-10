import React from 'react'
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { openModal } from "../../app/features/modal/modalSlice";
import "./CustomPostHead.css"
const CustomPostHead = ({post ,userId}) => {
    console.log("🚀 ~ file: CustomPostHead.js:8 ~ CustomPostHead ~ post", post)
    console.log("🚀 ~ file: CustomPostHead.js:8 ~ CustomPostHead ~ userId", userId)
    const dispatch = useDispatch();

  return (
    <div className="container">
    <div class="row" >
    <div className="col col-md-6 col-lg-4 d-flex justify-content-start">
    <img src={post.user.image} className="profile-img" alt="..." />&nbsp;
    <div>
    <div class="row" >
    {post.user.lastname}&nbsp;{post.user.firstname}
    </div>
    <div class="row" >
    <p className="moment">{moment(post.createdAt).fromNow()}</p>
    </div>
    </div>
    </div>
    <div className="col col-md-6 col-lg-4 d-flex justify-content-center">
    </div>
    {userId === post.user._id && (
    <div className="col col-md-6 col-lg-4 d-flex justify-content-end">
    <BsThreeDots
            className="CustomPostHead-icon"
            onClick={() =>
              dispatch(
                openModal({
                  name: "AddEditForm",
                  childrenProps: { post: post },
                })
              )
            }
          ></BsThreeDots>
    </div>)}
    </div>
    </div>
  )
}

export default CustomPostHead