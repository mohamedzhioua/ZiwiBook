import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card, CustomButton, CustomInput, FormLoader } from "../../index";
import classes from "./ProfilePhoto.module.css";
import IconStyle from "../../../styles/icons.module.css";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/getCroppedImg";
import Portal from "../../../utils/Portal";

function ProfilePhoto({ showProfilePhoto, setShowProfilePhoto }) {
  const refInput = useRef(null);
  const coverRef = useRef(null);
  const slider = useRef(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [error]);

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          console.log("donee", { croppedImage });
          setImage(croppedImage);
        } else {
          return croppedImage;
        }
      } catch (error) {
        console.error(error);
      }
    },
    [croppedAreaPixels]
  );
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //onChangefile
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  return (
    <Portal>
      <div className={`${classes.container} blur`}>
        <Card className={classes.profile_photo_container}>
          <CustomInput
            type="file"
            innerRef={refInput}
            hidden
            onChange={handleImage}
            accept="image/jpeg,image/png,image/webp,image/gif"
          />
          <div className={classes.header_exit}>
            Update Profile Picture
            <div
              className={`${classes.exit} small_circle`}
              onClick={() => setShowProfilePhoto(false)}
            >
              <i className={IconStyle.exit_icon} />
            </div>
          </div>
          <div className={classes.profile_photo_content}>
            {image ? (
              <>
                <FormLoader>
                  <div className={classes.crooper}>
                    <Cropper
                      image={image}
                      crop={crop}
                      zoom={zoom}
                      cropShape="round"
                      aspect={1 / 1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                  <div className={classes.slider}>
                    <div
                      className="small_circle hover1"
                      onClick={() => zoomOut()}
                    >
                      <i className={IconStyle.minus_icon}/>
                    </div>
                    <input
                      ref={slider}
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => {
                        setZoom(e.target.value);
                      }}
                      className="zoom-range"
                    />
                    <div
                      className="small_circle hover1"
                      onClick={() => zoomIn()}
                    >
                      <i className={IconStyle.plus_icon}/>
                    </div>
                  </div>
                  <div className={classes.buttons}>
                    <CustomButton
                      className={`gray_btn btns`}
                      onClick={() => setShowProfilePhoto(false)}
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton
                      className={`blue_btn btns`}
                      // onClick={() => updateProfielPicture()}
                    >
                      Save
                    </CustomButton>
                  </div>
                </FormLoader>
              </>
            ) : (
              <>
                <CustomButton
                  className={classes.upload_btn}
                  onClick={() => refInput.current.click()}
                >
                  <i className={IconStyle.addPhoto_icon} />
                  Upload photo
                </CustomButton>
                {/* {photosData?.length > 0 && (
                <div>Choose from old profile picture</div>
                <div className={classes.old_photos}></div>
                )} */}
              </>
            )}
          </div>
        </Card>
      </div>
    </Portal>
  );
}

export default ProfilePhoto;
