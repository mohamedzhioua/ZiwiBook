import React from "react";
import  "./index.css";

function Card({ children}) {
  return (
    <div  className="card-container">
      {children}
    </div>
  );
}

export default Card;
