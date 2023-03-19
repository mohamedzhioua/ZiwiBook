import moment from "moment";
import { Link } from "react-router-dom";
import style from "./Notification.module.css";
import chekedlike from "../.././../assets/svg/like.svg";
import { useIsNotifSeenMutation } from "../../../app/features/notification/notificationApi";

function Notification({ toast, t, notification }) {
  const [isNotifSeen] = useIsNotifSeenMutation();

  return (
    <div className={style.main}>
      <span className={style.header}> New notification</span>
      <Link
        className={style.content}
        to={`${notification.url}`}
        onClick={() => {
          toast.dismiss(t.id);
          isNotifSeen(notification?._id);
        }}
      >
        <div className={style.image}>
          <img src={notification?.sender?.photo} alt="" />
          {notification.type === "react" ? (
            <img className={style.type} src={chekedlike} alt="" />
          ) : (
            ""
          )}
        </div>
        <div className={style.content2}>
          <span>{notification.content}</span>
          <span className={style.time}>
            {moment(notification?.createdAt).fromNow()}
          </span>
        </div>
        <div>
          <p
            style={{
              background: `#5c6e58`,
              width: "12px",
              height: "12px",
              borderRadius: "100%",
            }}
          />
        </div>
      </Link>
    </div>
  );
}

export default Notification;
