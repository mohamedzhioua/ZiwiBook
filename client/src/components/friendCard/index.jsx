import { Link } from "react-router-dom";
import classes from "../../pages/friends/style.module.css";
import { useFetchUserProfileQuery, useFriendFuncMutation } from "../../app/features/user/userProfileApi";
import CustomButton from "../CustomButton";

export default function FriendCard({ user, type, requestID }) {
  const { data } = useFetchUserProfileQuery(user?.usernameID);
  const [FriendFunc] = useFriendFuncMutation();

  const acceptRequestHanlder = async (requestID) => {
    FriendFunc({ id: requestID, type: "accept" });
  };

  const cancelRequestHandler = async (requestID) => {
    FriendFunc({ id: requestID, type: "cancel" });
  };



  return (
    <div className={classes.req_card}>
      <Link to={`/profile/${user.username}`} className={classes.photo}>
        <img src={user.photo} alt="" />
        <div className={classes.req_name}>
          {user.firstName} {user.lastName}
        </div>
      </Link>
      {type === "sent" ? (
        <div className={classes.btns}>
          <CustomButton
            className="blue_btn"
            onClick={() => cancelRequestHandler(requestID)}
          >
            Cancel Request
          </CustomButton>
        </div>
      ) : type === "request" ? (
        <div className={classes.btns}>
          <CustomButton
            className="blue_btn"
            onClick={() => acceptRequestHanlder(requestID)}
          >
            Confirm
          </CustomButton>
          <CustomButton
            className="gray_btn"
            onClick={() => cancelRequestHandler(requestID)}
          >
            Delete
          </CustomButton>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
