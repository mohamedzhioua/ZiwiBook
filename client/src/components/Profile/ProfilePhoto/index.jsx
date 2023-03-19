import * as React from "react";
import { Card, CustomButton, CustomInput, FormLoader } from "../../index";
import classes from "./ProfilePhoto.module.css";
import IconStyle from "../../../styles/icons.module.css";
import { toast } from "react-toastify";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/getCroppedImg";
import Portal from "../../../utils/Portal";
import { useDispatch } from "react-redux";
import { Updatephoto } from "../../../app/features/user/userSlice";
import { useUpdateProfilePhotoMutation } from "../../../app/features/user/photosApi";

function ProfilePhoto({ setShowProfilePhoto ,photosData ,photoRef}) {
  const refInput = React.useRef(null);
  const slider = React.useRef(null);
  const dispatch = useDispatch();

  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [updateProfilePhoto, { isLoading }] = useUpdateProfilePhotoMutation();
  React.useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [error]);

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
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
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
  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const updateProfielPicture = async (e) => {
    e.preventDefault();
    setShowProfilePhoto(false);
    try {
      let img = await getCroppedImage(false);
      let blob = await fetch(img).then((r) => r.blob());
      let form = new FormData();
      form.append("image", blob);
      let photoData = await updateProfilePhoto(form).unwrap();
      photoRef.current.src=photoData.photo
      dispatch(Updatephoto(photoData.photo));
      setTimeout(() => {
        setShowProfilePhoto(false);
      }, 200);
    } catch (error) {
      setError("something went wrong please try again");
    }
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
                      <i className={IconStyle.minus_icon} />
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
                      <i className={IconStyle.plus_icon} />
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
                      onClick={updateProfielPicture}
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
                {photosData?.profilePhotos.length > 0 && (
                  <div className={classes.old}>
                    <span>Choose from old profile photos</span>
                    <div className={classes.old_photos}>
                      {photosData?.profilePhotos.map((photo) => (
                        <img
                          src={photo.url}
                          alt=""
                          onClick={() => setImage(photo.url)}
                          key={photo.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {photosData?.resources.length > 0 && (
                  <div className={classes.old}>
                    <span >Choose from your  photos</span>
                    <div className={classes.old_photos}>
                      {photosData?.resources.map((photo) => (
                        <img
                          src={photo.url}
                          alt=""
                          onClick={() => setImage(photo.url)}
                          key={photo.id}
                        />
                      ))}
                    </div>
                  </div>
                )}
                      </>)}
   
          </div>
        </Card>
      </div>
    </Portal>
  );
}

export default ProfilePhoto;
