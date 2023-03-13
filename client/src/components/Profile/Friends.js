import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Card } from "../index";
import style from "./index.module.css";
import IconStyle from "../../styles/icons.module.css";

function Friends({ userfriendsdata, photosSkelton }) {
  return (
    <Card>
      <div className={style.card_header}>
        Friends
        <Link className={style.photo_friends_link} to="#">
          See all Friends
        </Link>
      </div>
      <div className={style.photo_friends_content}>
        <div className={style.photo_friends_content_info}>
          {photosSkelton ? (
            <Skeleton width={80} height={10} />
          ) : (
            `${userfriendsdata?.length} Friends`
          )}
        </div>
        <div className={style.friends_grid}>
          {userfriendsdata &&
            userfriendsdata.slice(0, 9).map((user, index) => (
              <Link
                to={`/profile/${user?.username}`}
                key={index}
                className={style.link}
              >
                <div
                  className={style.friend_card}
                  style={{ backgroundImage: `url(${user?.photo})` }}
                ></div>
                <span className={style.friend_name}>
                  {`${user?.firstName} ${user?.lastName}`}
                  &nbsp; <i
                    className={IconStyle.confirmed_icon}
                  />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </Card>
  );
}

export default Friends;
