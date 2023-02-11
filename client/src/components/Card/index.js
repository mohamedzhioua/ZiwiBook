import React from "react";
import  "./index.css";

function Card({className,innerRef, children}) {
  return (
    <div ref={innerRef} className={className ? className : "card-container"}>
      {children}
    </div>
  );
}

export default Card;
