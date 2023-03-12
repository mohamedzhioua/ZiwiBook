import { useDispatch } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { CustomButton, CustomInput, Card, FormLoader } from "../../index";
import getCroppedImg from "../../../utils/getCroppedImg";
import classes from "./cover.module.css";
import IconStyle from "../../../styles/icons.module.css";
import { toast } from "react-toastify";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { UpdateCover } from "../../../app/features/user/userSlice";
import { useUpdateCoverPhotoMutation } from "../../../app/features/user/photosApi";
import OldCovers from "./OldCovers/OldCovers.js"

function ProfileCover({ isVisitor, user , photosData }) {
  const dispatch = useDispatch();
  const [updateCoverPhoto, { isLoading }] = useUpdateCoverPhotoMutation();
  const [image, setImage] = useState(null);
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const [showOldCover, setShowOldCover] = useState(false);
  const refInput = useRef(null);
  const CoverMenuRef = useRef();
  const coverRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();


  useOnClickOutside(CoverMenuRef, showCoverMneu, () => {
    setShowCoverMenu(false);
  });
  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
    setHeight(coverRef.current.clientHeight);
  }, [window.innerWidth]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [error]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
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
            <div className={classes.cropper}>
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
