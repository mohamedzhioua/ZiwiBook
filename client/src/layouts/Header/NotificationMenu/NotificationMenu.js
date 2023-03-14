import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { useFetchNotifQuery } from "../../../app/features/notification/notificationApi";
import style from "./Notification.module.css";
import moment from "moment";
import chekedlike from "../../../svg/like.svg";

function NotificationMenu({ setShowNotification }) {
  const { data, isLoading, isSuccess, isFetching } = useFetchNotifQuery();
  const navigate = useNavigate();

  return (
    <div className={style.notif_menu}>
      <h2>Notifications</h2>
      <div>
        {!isLoading &&
          isSuccess &&
          data &&
          (data?.length > 0
            ? data?.map((notification) => (
                <div
                  className={`${style.notification} hover2`}
                  key={notification._id}
                >
                  <div
                    className={style.content}
                    onClick={() => {
                      setShowNotification(false);
                      navigate(notification.url);
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
                      {notification.seen === "unseen" && (
                        <p
                          style={{
                            background: `#0096ff`,
                            width: "12px",
                            height: "12px",
                            borderRadius: "100%",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            : "No Notification")}
        {isLoading && (
          <>
            <Skeleton className={style.notification} height={76} />
            <Skeleton className={style.notification} height={76} />
          </>
        )}
      </div>
    </div>
  );
}

export default NotificationMenu;
