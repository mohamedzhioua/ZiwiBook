import * as React from "react";
import {
  useAddNewPostMutation,
  useUpdatePostMutation,
} from "../../../app/features/post/postApi";
import { CustomInput, CustomButton, FormLoader } from "../../index";
import { toast } from "react-toastify";
import { closeModal } from "../../../app/features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { Photo } from "../../../assets/svg";
import styleIcons from "../../../styles/icons.module.css";
import uploadFileSVG from "../../../assets/svg/uploadFile.svg";
import style from "./Post.module.css";

const AddEditPost = ({ post, user }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");
  const [image, setImage] = React.useState("");
  const [error, setError] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const refImageInput = React.useRef(null);
  const [showImageContainer, setShowImageContainer] = React.useState(false);
  const id = post?._id || null;
  const [addNewPost, { isLoading, isError, isSuccess,error:postError}] =useAddNewPostMutation();
  const [
    updatePost,
    {
      isLoading: updateIsLoading,
      isError: updateError,
      isSuccess: updateIsSuccess,
    },
  ] = useUpdatePostMutation();
const addloading = isLoading || isSuccess
  React.useEffect(() => {
    if (isError || updateError) {
      setError(postError.data.message);
    }

    if (isSuccess || updateIsSuccess) {
      clear();
      dispatch(closeModal());
    }
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
    });
  }, [isSuccess, updateIsSuccess, isError, updateError, error, dispatch]);

  //displaying picture after upload handler
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  //handling the memorie old fields for the update
  React.useEffect(() => {
    if (post) {
      setImage(post?.image);
      setText(post?.text);
    }
  }, [post]);

  //clearing the state for the newest user inputs
  const clear = () => {
    setImage("");
    setText("");
    setPicture(null);
  };
  const clearImage = () => {
    setImage("");
    setPicture(null);
  };

  //onChangefile
  const onChangefile = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/jpg"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    }
    setImage(file);
    setError(null);
  };

  //onsubmitHandler
  const onsubmitHandler = async (event) => {
    event.preventDefault();
    let dataForm = new FormData();
    dataForm.append("text", text);
    dataForm.append("image", image);
    if (Boolean(post)) {
      await updatePost({ id, dataForm });
    } else {
      await addNewPost(dataForm);
    }
  };
  return (
    <div className={style.post_container}>
      <FormLoader loading={updateIsLoading || addloading}>
        <div className={style.post_head}>
          <span>{post ? "Update your " : "Create "}post</span>
        </div>

        <div className={style.post_auther}>
          <img
            src={user.photo}
            alt="userphoto"
            className={style.auther_photo}
          />
          <span className={style.auther_name}>
            {`${user.firstName} ${user.lastName}`}
          </span>
        </div>
        <div className={style.post_content}>
          <CustomInput
            type="textarea"
            placeholder={`What's on your mind, ${user?.firstName}?`}
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className={style.textarea}
          />

          <div>
            <CustomInput
              type="file"
              innerRef={refImageInput}
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                onChangePicture(e);
                onChangefile(e);
              }}
              name="image"
              hidden
            />
            {showImageContainer && (
              <div className={style.post_image_container}>
                {picture ? (
                  <div className={`${style.add_image} ${style.imge}`}>
                    <div
                      className={`${style.exit} ${style.small_white_circle}`}
                      onClick={() => {
                        setShowImageContainer(false);
                        clearImage();
                      }}
                    >
                      <i className={styleIcons.exit_icon} />
                    </div>
                    <img
                      id="output"
                      src={picture && picture}
                      alt="your_image"
                      className={style.img}
                    />
                  </div>
                ) : (
                  <div className={`${style.add_image} hover2`}>
                    <div
                      className={`${style.exit} ${style.small_white_circle}`}
                      onClick={() => setShowImageContainer(false)}
                    >
                      <i className={styleIcons.exit_icon} />
                    </div>
                    <div>
                      <CustomButton
                        className={style.post_btn}
                        onClick={() => {
                          refImageInput.current.click();
                        }}
                      >
                        <img src={uploadFileSVG} alt="uploadFileSVG" />
                        Upload A photo
                      </CustomButton>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={style.post_footer}>
          <div className={style.post_action}>
            <div className={style.footer_text}>Add to your post</div>
            <div className="hover1" onClick={() => setShowImageContainer(true)}>
              <Photo color="#45bd62" />
            </div>
          </div>
          <CustomButton
            className="button button8"
            value={post ? "update" : "submit"}
            disabled={!text || error}
            onClick={onsubmitHandler}
          />
        </div>
      </FormLoader>
    </div>
  );
};

export default AddEditPost;
