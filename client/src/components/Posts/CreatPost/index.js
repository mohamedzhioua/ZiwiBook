import { useDispatch, useSelector } from "react-redux";
// features
import { openModal } from "../../../app/features/modal/modalSlice";
// styles
import classe from "./postbody.module.css";
import { Feeling, LiveVideo, Photo } from "../../../svg";

function CreatPost() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  return (
    <div className={classe.post_body}>
      <div className={classe.post_body_header}>
        <img className={classe.post_body_image} src={user?.photo} alt="" />
        <div
          className={`${classe.open_post} hover2`}
          onClick={() =>
            dispatch(
              openModal({
                name: "AddEditPost",
                childrenProps: { user: user },
              })
            )
          }
        >
          {` What's on your mind, ${user?.firstName}`}
        </div>
      </div>
      <div className={classe.splitter} />
      <div className={classe.post_body_footer}>
        <div className={`${classe.actions_icon} hover1`}>
          <LiveVideo color="#f3425f" />
          Live Video
        </div>

        <div
          className={`${classe.actions_icon} hover1`}
        
        >
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className={`${classe.actions_icon} hover1`}>
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}

export default CreatPost;
