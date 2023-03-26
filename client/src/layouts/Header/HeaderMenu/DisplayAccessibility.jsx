import { useDispatch, useSelector } from "react-redux";
import styles from "./HeaderMenu.module.css";
import arrowBack from "../../../assets/svg/arrowBack.svg"
import IconStyle from "../../../styles/icons.module.css"
import { changeTheme } from "../../../app/features/user/userSlice";

export default function DisplayAccessibility({ setShow }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);
  return (
    <div className={styles.absolute_container}>
      <div className={styles.absolute_container_header}>
        <div
          className={`${styles.circle} hover1`}
          onClick={() => {
            setShow(false);
          }}
        >
          <img src={arrowBack} alt="arrowBack" />
        </div>
        Display & Accessibility
      </div>
      <div className={styles.mmenu_main}>
        <div className={styles.small_circle} style={{ width: "50px" }}>
          <i className={IconStyle.dark_filled_icon}></i>
        </div>
        <div className={styles.mmenu_col}>
          <span className={styles.mmenu_span1}>Dark Mode</span>
          <span className={styles.mmenu_span2}>
            Adjust the appearance of Ziwibook to reduce glare and give your eyes
            a break.
          </span>
        </div>
      </div>
      <label
        htmlFor="darkOff"
        className="hover1"
        onClick={() => {
          dispatch(changeTheme("light"));
        }}
      >
        <span>Off</span>
        {theme === "light" ? (
          <input type="radio" name="dark" id="darkOff" defaultChecked={true} />
        ) : (
          <input type="radio" name="dark" id="darkOff" />
        )}
      </label>
      <label
        htmlFor="darkOn"
        className="hover1"
        onClick={() => {
          dispatch(changeTheme("dark"));
        }}
      >
        <span>On</span>
        {theme === "light" ? (
          <input type="radio" name="dark" id="darkOn" />
        ) : (
          <input type="radio" name="dark" id="darkOn" defaultChecked={true} />
        )}
      </label>
    </div>
  );
}
