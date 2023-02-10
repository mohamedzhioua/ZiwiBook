import { Link } from "react-router-dom";
import { Card } from "../index";
// Styles
import "./index.css";
function Photos() {
  const data = [
    {
      id: "0",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "1",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "2",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "3",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "4",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "5",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "6",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "7",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "8",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
    {
      id: "9",
      url: "https://media.techtribune.net/uploads/2021/08/one-piece-zoro-1278854-1280x0.jpeg",
    },
  ];

  return (
    <Card>
      <div className="card_header">
        Photos
        <Link className="photo-link" to="#">
          See all photos
        </Link>
      </div>
      <div className="content">
        <div className="content-info">`${data?.length} Photos`</div>
        <div className="photo_grid">
          {data.slice(0, 9).map((img) => (
            <div
              className="photo_card"
              key={img.id}
              style={{ backgroundImage: `url(${img.url})` }}
            ></div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default Photos;
