import React from "react";
import  "./index.css";

function Card({className, children}) {
  return (
    <div  className={className ? className : "card-container"}>
      {children}
    </div>
  );
}

export default Card;
