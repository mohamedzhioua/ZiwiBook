import { Link } from "react-router-dom";
import { Card } from "../index";
// Styles
import style from  "./index.module.css";
function Friends() {
  const data = [
    {
      id: "0",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "1",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "2",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "3",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "4",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "5",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "6",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "7",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "8",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "9",
      username: "hama",
      photo:
        "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
  ];
  return (
    <Card>
      <div className={style.card_header}>
        Friends
        <Link className={style.photo_friends_link} to="#">
          See all Friends
        </Link>
      </div>
      <div className={style.photo_friends_content}>
        <div className={style.photo_friends_content_info}>{`${data?.length} Friends`}</div>
        <div className={style.friends_grid}>
          {data.slice(0, 9).map((user, i) => (
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
