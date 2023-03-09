import { useRef, useState } from "react";
import { useFriendFuncMutation } from "../../../app/features/friend/friendSlice";
import { Card, CustomButton } from "../../index";
import style from "./Friendship.module.css";

function Friendship({ userId ,userfriendshipdata}) {
  const menu = useRef(null);
  const [respondMenu, setRespondMenu] = useState(false);

  const [FriendFunc] = useFriendFuncMutation();

  const addFriendHandler = () => {
    FriendFunc({ id: userId , type: "add"});
  };
  const acceptRequestHanlder = () => {
    FriendFunc ({ id: userfriendshipdata.requestID, type: "accept" });
  };

  const cancelRequestHandler = () => {
    FriendFunc({ id: userfriendshipdata.requestID, type: "cancel" });
  };

  return (
    <div className={style.container}>
      
     { !userfriendshipdata?.requestSent &&
     !userfriendshipdata?.requestReceived &&
      (<CustomButton
        value="Add as A friend"
        className={`blue_btn btns`}
        onClick={() => addFriendHandler()}
      />)}
        {userfriendshipdata?.requestSent ? (
        <CustomButton className="blue_btn btns"
        value="Cancel Request"
         onClick={() => cancelRequestHandler()}
         >
         </CustomButton>
         ) : (
          userfriendshipdata?.requestReceived && (
            <>
              <CustomButton
              value="Respond"
                className="gray_btn btns"
                onClick={() => setRespondMenu((perv) => !perv)}
              >
              </CustomButton>
              {respondMenu && userfriendshipdata?.requestReceived && (
                <Card className={style.open_menu} innerRef={menu}>
                  <div
                    className={`${style.item} hover1`}
                    onClick={() => acceptRequestHanlder()}
                  >
                    Confirm
                  </div>
                  <div
                    className={`${style.item} hover1`}
                    onClick={() => cancelRequestHandler()}
                  >
                    Delete
                  </div>
                </Card>
              )}
            </>
          )
        )}
      <CustomButton className={`gray_btn btns`} value="Message" />
    </div>
  );
}

export default Friendship;
