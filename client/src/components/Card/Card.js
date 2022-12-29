import React from "react";
import   "./Card.css";
import moment from "moment"
const Card = ({post}) => {
  return (
    <div class="card h-100" >
      <img src={post.image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{post.title}</h5>
        <p class="card-text">{post.body.substring(0,20)}</p>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
     </div>
  );
};

export default Card;
