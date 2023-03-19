import { CustomButton } from "../index";
import style from "./index.module.css";

function ProfileInfo({ isVisitor }) {
  return (
    <div className={style.profile_info}>
      <div className={style.left}>
        <span className={style.profile_user_name}>ziwi</span>
      </div>
      <div className={style.cente} r>
        <span className={style.profile_user_name}>ziwi</span>
        <span className={style.profile_user_info}>ziwi</span>
      </div>
      <div className={style.right}>
        <div className={style.btns}>
          {isVisitor ? (
            <CustomButton value="Add as A friend" className="profileBTN" />
          ) : (
            <CustomButton className="profileBTN" value="Edit profile" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
