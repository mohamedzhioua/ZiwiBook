import React, { useRef } from "react";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import classes from "./OldCovers.module.css";
import IconStyle from "../../../../styles/icons.module.css";
import {Card} from "../../../index";

function OldCovers({ setShowOldCover, setImage, photosData, showOldCover }) {
  const oldCoversCardRef = useRef(null);

  useOnClickOutside(oldCoversCardRef, showOldCover, () => {
    setShowOldCover(false);
  });

  return (
    <div className={`${classes.container} blur`}>
      <Card className={classes.card} innerRef={oldCoversCardRef}>
        <div className={classes.header}>
          Update Cover Photo
          <div className="small_circle" onClick={() => setShowOldCover(false)}>
            <i className={IconStyle.exit_icon}/>
          </div>
        </div>
        <div className={classes.content}>
          {photosData?.profileCovers.length > 0 && (
            <>
              <div>Choose from old cover picture</div>
              <div className={classes.old_photos}>
                {photosData?.profileCovers.map((photo) => (
                  <img
                    src={photo.url}
                    alt={photo.id}
                    onClick={() => {
                      setImage(photo.url);
                      setShowOldCover(false);
                    }}
                    key={photo.id}
                  />
                ))}
              </div>
            </>
          )}
          {photosData?.resources.length > 0 && (
            <>
              <div>Choose from your profile photos</div>
              <div className={classes.old_photos}>
                {photosData?.resources.map((photo) => (
                  <img
                    src={photo.url}
                    alt={photo.id}
                    onClick={() => {
                      setImage(photo.url);
                      setShowOldCover(false);
                    }}
                    key={photo.id}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default OldCovers;
