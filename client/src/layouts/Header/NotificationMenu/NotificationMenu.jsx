import { Link } from "react-router-dom";
import { useFetchNotifQuery, useIsNotifSeenMutation } from "../../../app/features/notification/notificationApi";
import style from "./Notification.module.css";
import moment from "moment";
import chekedlike from "../../../assets/svg/like.svg";
import { CustomButton, NotificationSkeleton } from "../../../components";
import { Fragment, memo, useRef, useState } from "react";
import useHover from "../../../hooks/useHover";
import Portal from "../../../utils/Portal";
import IconStyle from "../../../styles/icons.module.css";

function NotificationMenu({ setShowNotification }) {
  const notif = useRef(null)
  // const [ref, isHovered] = useHover(notif);
  const { data, isLoading, isSuccess } = useFetchNotifQuery();
  const [isNotifSeen] = useIsNotifSeenMutation();
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false)

  return (
    <div className={style.notif_menu} >

      <h2>Notifications</h2>
      <div >
        {!isLoading &&
          isSuccess &&
          data.notifies &&
          (data?.notifies?.length > 0
            ? data?.notifies?.map((notification) => (

              <div
                className={`${style.notification} hover2`}
                key={notification._id}
                id={notification._id}
                onMouseOver={() => {
                  setShow(true)
                  setActive(notification._id);
                }}
                onMouseLeave={() => {
                  setShow(false)
                  setActive(null);
                }}
              >
                   {notification._id === active && show &&
                    (<Portal id={notification._id}>
                      <div className={`${style.trashIcon} smaller_circle`}onClick={() => console.log("hhhhhh")}>
                        <i className={IconStyle.trash_icon} />
                      </div>
                    </Portal>
                    )

                  }
                 <Link
                  className={style.content}
                  to={`${notification.url}`}
                  onClick={() => {
                    setShowNotification(false)
                    isNotifSeen(notification?._id)
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
                  <div className={style.content2} >
                    <span>{notification.content}</span>
                    <span className={style.time}>
                      {moment(notification?.createdAt).fromNow()}
                    </span>
                  </div>
                  <div>
                    {notification.seen === false && (
                      <p
                        style={{
                          background: `#5c6e58`,
                          width: "9px",
                          height: "9px",
                          borderRadius: "100%",
                        }}
                      />
                    )}
                  </div>

                </Link>
              </div>
            ))
            : "No Notification")}
        {isLoading && (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        )}
      </div>
    </div>
  );
}
const memoizedNotificationMenu = memo(NotificationMenu)

export default memoizedNotificationMenu;
