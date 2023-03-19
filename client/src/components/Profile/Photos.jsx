import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Card } from "../index";
import style from "./index.module.css";
import PuffLoader from "react-spinners/PuffLoader";

function Photos({ photosData, photosSkelton }) {
  return (
    <Card>
      <div className={style.card_header}>
        Photos
        <Link className={style.photo_friends_link} to="#">
          See all photos
        </Link>
      </div>
      <div className={style.photo_friends_content}>
        <div className={style.photo_friends_content_info}>
          {photosSkelton ? (
            <Skeleton width={80} height={10} />
          ) : (
            `${photosData?.resources?.length} Photos`
          )}
        </div>
        {photosSkelton ? (
          <PuffLoader loading={photosSkelton} size={40} />
        ) : (
          <div className={style.photo_grid}>
            {photosData?.resources?.slice(0, 9).map((img) => (
              <div
                className={style.photo_card}
                key={img.id}
                style={{ backgroundImage: `url(${img.url})` }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default Photos;
