import { useDispatch } from "react-redux";
import * as React from "react";
import Cropper from "react-easy-crop";
import { CustomButton, CustomInput, Card, FormLoader } from "../../index";
import getCroppedImg from "../../../utils/getCroppedImg";
import classes from "./cover.module.css";
import IconStyle from "../../../styles/icons.module.css";
import { toast } from "react-toastify";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { UpdateCover } from "../../../app/features/user/userSlice";
import { useUpdateCoverPhotoMutation } from "../../../app/features/user/photosApi";
import OldCovers from "./OldCovers/OldCovers.jsx"

function ProfileCover({ isVisitor, user, photosData }) {
  const dispatch = useDispatch();
  const [updateCoverPhoto, { isLoading }] = useUpdateCoverPhotoMutation();
  const [image, setImage] = React.useState(null);
  const [showCoverMneu, setShowCoverMenu] = React.useState(false);
  const [showOldCover, setShowOldCover] = React.useState(false);
  const refInput = React.useRef(null);
  const CoverMenuRef = React.useRef();
  const coverRef = React.useRef(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [width, setWidth] = React.useState();
  const [height, setHeight] = React.useState();


  useOnClickOutside(CoverMenuRef, showCoverMneu, () => {
    setShowCoverMenu(false);
  });

  React.useEffect(() => {
    setWidth(coverRef.current.clientWidth);
    setHeight(coverRef.current.clientHeight);
  }, [window.innerWidth]);

  React.useEffect(() => {
    if (showOldCover) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [showOldCover]);

  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [error]);

  const getCroppedImage = React.useCallback(
    async (show) => {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
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

  const onCropComplete = React.useCallback((croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  
  const updateCover = async (e) => {
    e.preventDefault();
    try {
      let img = await getCroppedImage(false);
      let blob = await fetch(img).then((r) => r.blob());
      let form = new FormData();
      form.append("image", blob);
      let coverData = await updateCoverPhoto(form).unwrap();
      dispatch(UpdateCover(coverData.cover));
      coverRef.current.style.backgroundImage = `url(${coverData.cover})`;
      setTimeout(() => {
        setImage(null);
      }, 200);
    } catch (error) {
      setError("something went wrong please try again");
    }
  };

  return (
    <div
      className={classes.coverContainer}
      ref={coverRef}
      style={{
        backgroundImage: `${!isLoading ? `url(${user?.cover})` : ""}`,
      }}
    >
      {image && (
        <>
          <div className={classes.btns_container}>
            <div className={classes.left}>
              <i className={IconStyle.public_icon}></i>
              Your cover is public
            </div>
            <div className={classes.btns}>
              <CustomButton
                className={`gray_btn ${classes.cover}`}
                onClick={() => setImage(null)}
                value="Cancel"
              />

              <CustomButton
                className={`blue_btn ${classes.cover}`}
                value="Save"
                onClick={updateCover}
              />
            </div>
          </div>
          <FormLoader loading={isLoading}>
            <div className={classes.cover_cropper}>
              <Cropper
                classes={{
                  mediaClassName: classes.mediaClassName,
                }}
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={width / height}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                showGrid={true}
                objectFit="horizontal-cover"
              />
            </div>
          </FormLoader>
        </>
      )}
      {!isVisitor && (
        <>
          <div className={classes.edit_container}>
            <CustomInput
              type="file"
              innerRef={refInput}
              hidden
              onChange={handleImage}
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <div
              className={classes.edit}
              onClick={() => setShowCoverMenu((prev) => !prev)}
            >
              <i className={IconStyle.camera_filled_icon}></i>
              <span>Add Cover Photo</span>
            </div>
            {showCoverMneu && (
              <Card
                className={classes.cover_upload_menu}
                innerRef={CoverMenuRef}
              >
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={() => setShowOldCover(true)}
                >
                  <i className="photo_icon"></i>
                  Select Photo
                </div>
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={() => refInput.current.click()}
                >
                  <i className={IconStyle.upload_icon}></i>
                  Upload Photo
                </div>
              </Card>
            )}
          </div>
          {showOldCover && (
            <OldCovers
              showOldCover={showOldCover}
              photosData={photosData}
              setShowOldCover={setShowOldCover}
              setImage={setImage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ProfileCover;
