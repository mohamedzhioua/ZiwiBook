import { Link} from "react-router-dom";
import style from "./HeaderMenu.module.css";
import styleIcons from "../../../styles/icons.module.css";
import {  useState } from "react";
import { useLogoutMutation } from "../../../app/features/auth/authApi";
import DisplayAccessibility from "./DisplayAccessibility";

function HeaderMenu({ user, setShowHeaderMenu }) {
  const [Logout] = useLogoutMutation();
const [show ,setShow]=useState(false)
  const LogoutHandler = async () => {
    Logout();
  };
  return (
    <div className={style.header_menu}>
      <div>
        <Link
          className={`${style.head} hover1`}
          to={`/profile/${user?.username}`}
          onClick={() => setShowHeaderMenu(false)}
        >
          <img src={user?.photo} alt="" className={style.menu_image} />
          <span className={style.menu_user}>
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
        <div className={style.menu_splitter}></div>
        <div className={`${style.menu_action} hover1`}>
          <div className={style.circle_icons}>
            <i className={styleIcons.settings_filled_icon}></i>
          </div>
          <span className={style.action_span}>Settings & privacy</span>
          <div className={style.Arrow}>
            <i className={styleIcons.right_icon}></i>
          </div>
        </div>
        <div className={`${style.menu_action} hover1`}>
          <div className={style.circle_icons}>
            <i className={styleIcons.help_filled_icon}></i>
          </div>
          <span className={style.action_span}>Help & support</span>
          <div className={style.Arrow}>
            <i className={styleIcons.right_icon}></i>
          </div>
        </div>
        <div className={`${style.menu_action} hover1`}
         onClick={() => {
          setShow(true);
        }}>
          <div className={style.circle_icons}>
            <i className={styleIcons.dark_filled_icon}></i>
          </div>
          <span className={style.action_span}>Display & Accessibility</span>
          <div className={style.Arrow}>
            <i className={styleIcons.right_icon}></i>
          </div>
        </div>
        <div className={`${style.menu_action} hover1`}>
          <div className={style.circle_icons}>
            <i className={styleIcons.report_filled_icon}></i>
          </div>
          <div className={style.menu_col}>
            <div className={style.action_span}>Give feedback</div>
          </div>
        </div>
        <div
          className={`${style.menu_action} hover1 click`}
          onClick={LogoutHandler}
        >
          <div className={style.circle_icons}>
            <i className={styleIcons.logout_filled_icon}></i>
          </div>
          <span>Logout</span>
        </div>
      </div>
      {show && (
        <DisplayAccessibility user={user} setShow={setShow} />
      )}
    </div>
  );
}

export default HeaderMenu;
