import React from "react";

// Styles
import "./index.css";
function ProfileCover() {
  return (
    <div className="profile-images">
      <img
        src="https://cdn.pixabay.com/photo/2018/04/18/14/26/background-image-3330583__480.jpg"
        className="cover-image"
        alt="..."
      />
      <img
        src="https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000"
        className="profile-user-image"
        alt="..."
      />
    </div>
  );
}

export default ProfileCover;
