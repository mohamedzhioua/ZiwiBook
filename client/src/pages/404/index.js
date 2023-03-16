import React from "react";
import { Link } from "react-router-dom";
import classes from "./404.module.css";
import ErrorSVG from "../../svg/404Error.svg";
// 404 page
const NotFound = () => {
  return (
    <div className={classes.error_container}>
      <img src={ErrorSVG} alt="error_svg" />
      <div  className={classes.error_body}>
      <h1 >
        Looks like this page does not exist or Something Went Wrong.
      </h1>
      <h3>
        Go Back to the{" "} 
        <Link className={classes.link} to="/">
          Home Page
        </Link>
      </h3>
      </div>
    </div>
  );
};

export default NotFound;
