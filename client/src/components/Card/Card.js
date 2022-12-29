import React from "react";

const Card = ({id, title, body, image }) => {
  return (
    <div class="card">
      <img src={image} class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{title}</h5>
        <p class="card-text">{body}</p>
      </div>
    </div>
  );
};

export default Card;
