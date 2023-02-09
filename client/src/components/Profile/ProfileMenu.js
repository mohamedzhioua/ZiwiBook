import React from "react";
import { Link } from "react-router-dom";

 // Styles
import "./index.css";

const ProfileMenu = () => {
  return (
    <div className="profile-menu-container">
      <div className="profile-menu">
        <Link to="#" className="active">
          Posts
        </Link>
        <Link to="#" className="hover1">
          About
        </Link>
        <Link to="#" className="hover1">
          Friends
        </Link>
        <Link to="#" className="hover1">
          Photos
        </Link>
      </div>
     </div>
  );
};

export default ProfileMenu;
