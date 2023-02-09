//components
import { CustomButton } from "../index";
// Styles
import "./index.css";

function ProfileInfo({ isVisitor }) {
  return (
    <div className="profile-info">
      <div className="left">
        <span className="profile-user-name">ziwi</span>
      </div>
      <div className="center">
        <span className="profile-user-name">ziwi</span>
        <span className="profile-user-info">ziwi</span>
      </div>
      <div className="right">
        {isVisitor ? (
          <CustomButton value="Add as A friend" className="button3" />
        ) : (
          <CustomButton className="button3" value="Edit profile" />
        )}
      </div>
    </div>
  );
}

export default ProfileInfo;
