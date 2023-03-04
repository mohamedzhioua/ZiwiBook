import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../app/features/auth/authSlice";
import style from "./Header.module.css";
import styleIcons from "../../styles/icons.module.css";
function HeaderMenu({ user, setShowHeaderMenu }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
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
        <div className={`${style.menu_action} hover1`}>
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
    </div>
  );
}

export default HeaderMenu;
