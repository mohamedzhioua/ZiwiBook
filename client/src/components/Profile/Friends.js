import { Link } from "react-router-dom";
import { Card } from "../index";
// Styles
import style from  "./index.module.css";
function Friends({userfriendsdata}) {
  
  return (
    <Card>
      <div className={style.card_header}>
        Friends
        <Link className={style.photo_friends_link} to="#">
          See all Friends
        </Link>
      </div>
      <div className={style.photo_friends_content}>
        <div className={style.photo_friends_content_info}>{`${userfriendsdata?.length} Friends`}</div>
        <div className={style.friends_grid}>
          {userfriendsdata.slice(0, 9).map((user, i) => (
            <Link to={`/profile/${user?.username}`} key={i}>
              <div
                className={style.friend_card}
                style={{ backgroundImage: `url(${user?.photo})` }}
              ></div>
              <span className={style.friend_name}>{user?.username}</span>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Friends;
