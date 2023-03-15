import React from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import style from "./Notification.module.css";
import chekedlike from "../../svg/like.svg";

function Notification({ toast, t, notification }) {
  const navigate = useNavigate();
  return (
    <div className={style.main}>
      <div className={style.header}>
        <span>New notification</span>
        <div
          onClick={() => toast.dismiss(t.id)}
          className="small_circle"
          style={{
            width: "25px",
            height: "25px",
            margin: "0",
          }}
        >
          <i
            className="exit_icon"
            style={{
              transform: "scale(0.7)",
            }}
          ></i>
        </div>
      </div>
      <Link
        className={style.content}
        to={`${notification.url}`}
        onClick={() => {
          toast.dismiss(t.id);
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
