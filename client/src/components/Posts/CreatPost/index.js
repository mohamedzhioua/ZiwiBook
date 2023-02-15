import { useDispatch } from "react-redux";
// features
import { openModal } from "../../../app/features/modal/modalSlice";
import { Card } from "../../index";
// styles
import "./index.css";

function CreatPost({ user }) {
  const dispatch = useDispatch();
  return (
    <Card>
      <div className="creat_post">
        <div className="creat_post_header">
          <img className="creat_post_image" src={user?.image} alt="" />
          <div
            className="open_post hover2"
            onClick={() => dispatch(openModal({ name: "AddEditPost" }))}
          >
            {` What's on your mind, ${user?.name}`}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CreatPost;
