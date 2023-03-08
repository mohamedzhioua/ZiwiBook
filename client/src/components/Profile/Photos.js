import { Link } from "react-router-dom";
import { Card } from "../index";
// Styles
import "./index.css";
function Photos({ photosData }) {

  return (
    <Card>
      <div className="card-header">
        Photos
        <Link className="photo-friends-link" to="#">
          See all photos
        </Link>
      </div>
      <div className="photo-friends-content">
        <div className="photo-friends-content-info">{`${photosData?.resources.length} Photos`}</div>
        <div className="photo-grid">
          {photosData.resources.slice(0, 9).map((img) => (
            <div
              className="photo-card"
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
