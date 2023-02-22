import { useDispatch } from "react-redux";
import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";

import { CustomButton, CustomInput, Card } from "../index";
import { updateCoverPhoto } from "../../app/features/auth/authSlice";
import getCroppedImg from "../../utils/getCroppedImg";
// Styles
import "./index.css";
import { MdPublic } from "react-icons/md";
import { BsCameraFill } from "react-icons/bs";

function ProfileCover({ isVisitor }) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  console.log("🚀 ~ file: ProfileCover.js:17 ~ ProfileCover ~ image:", image)
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const [showOldCover, setShowOldCover] = useState(false);
  const refInput = useRef(null);
  const CoverMenuRef = useRef();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async (show) => {
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
  }, [croppedAreaPixels]);

  //onChangefile
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      //   setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      //   setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  //onsubmitHandler
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {

    let img = await getCroppedImage(false);
    let blob = await fetch(img).then((r) => r.blob());
    let form = new FormData();
    console.log(
      "🚀 ~ file: ProfileCover.js:77 ~ onsubmitHandler ~ form:",
      form
    );
    form.append("image", blob);
    dispatch(updateCoverPhoto(form))
      .unwrap()
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="profile-cover"
      style={{
        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc9IX3RVEhPXrNb9UtreYJ3gmtf_ZGLS-NvA&usqp=CAU)`,
      }}
    >
      {image && (
        <>
          <div className="save-cover">
            <div className="left">
              <MdPublic
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
              Your cover is public
            </div>
            <div className="cover-btns">
              <CustomButton
                className="gray_btn cover"
                onClick={() => setImage(null)}
                value="Cancel"
              />

              <CustomButton
                className="blue_btn cover"
                value="Save"
                onClick={onsubmitHandler}
              />
            </div>
          </div>
          <div className="cover_cropper">
            <Cropper
              classes={{
                mediaClassName: "mediaClassName",
              }}
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              showGrid={true}
              objectFit="horizontal-cover"
            />
          </div>
        </>
      )}
      {isVisitor && (
        <>
          <div className="edit-cover-container">
            <CustomInput
              type="file"
              innerRef={refInput}
              hidden
              onChange={handleImage}
              accept="image/jpeg,image/png,image/webp,image/gif"
            />
            <div
              className="edit-cover"
              onClick={() => setShowCoverMenu((prev) => !prev)}
            >
              <BsCameraFill />
              <span>Add Cover Photo</span>
            </div>
            {showCoverMneu && (
              <Card className="cover_upload_menu" innerRef={CoverMenuRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => setShowOldCover(true)}
                >
                  <i className="photo_icon"></i>
                  Select Photo
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => refInput.current.click()}
                >
                  <i className="upload_icon"></i>
                  Upload Photo
                </div>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProfileCover;
