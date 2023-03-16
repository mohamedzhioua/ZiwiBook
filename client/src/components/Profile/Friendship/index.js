import { useEffect, useRef, useState } from "react";
import { useFetchUserProfileQuery,useFriendFuncMutation } from "../../../app/features/user/userProfileApi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { Card, CustomButton } from "../../index";
import style from "./Friendship.module.css";

function Friendship({ userId ,userfriendshipdata,usernameID}) {
  const menu = useRef(null);
  const menuRef = useRef(null);
  const [respondMenu, setRespondMenu] = useState(false);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [requestStatus, setRequestStatus] = useState(userfriendshipdata);
  const [FriendFunc , {isSuccess}] = useFriendFuncMutation();
  const { data } = useFetchUserProfileQuery(usernameID);


  useEffect(() => {
    if (isSuccess) {
      setRequestStatus( data?.data?.friendship);
    }
  }, [data , usernameID ,isSuccess]);

  useEffect(() => {
    setRequestStatus(userfriendshipdata);
  }, [userfriendshipdata]);

  useOnClickOutside(menu, respondMenu, () => {
    setRespondMenu(false);
  });
  useOnClickOutside(menu, friendsMenu, () => {
    setFriendsMenu(false);
  });

  const addFriendHandler = () => {
    FriendFunc({ id: userId , type: "add"});
  };
  const acceptRequestHanlder = () => {
    FriendFunc({ id: requestStatus.requestID, type: "accept" });
    setRespondMenu(false);
  };

  const cancelRequestHandler = () => {
    FriendFunc({ id: requestStatus.requestID, type: "cancel" });
    setRespondMenu(false);
  };

  return (
    <div className={style.container}>
      {requestStatus?.friends ? (
        <>
          <CustomButton
          value="Friends"
          className="gray_btn btns"
            onClick={() => setFriendsMenu((perv) => !perv)}
          >
          </CustomButton>
          {friendsMenu && (
            <Card className={style.open_menu} innerRef={menuRef}>
              <div
                className={`${style.item} hover1`}
              >
                Unfriend
              </div>
            </Card>
          )}
        </>
      ):( 
     !requestStatus?.requestSent &&
     !requestStatus?.requestReceived &&
      (<CustomButton
        value="Add as A friend"
        className={`blue_btn btns`}
        onClick={() => addFriendHandler()}
      />
      )
      )}
        {requestStatus?.requestSent ? (
        <CustomButton className="blue_btn btns"
        value="Cancel Request"
         onClick={() => cancelRequestHandler()}
         >
         </CustomButton>
         ) : (
          requestStatus?.requestReceived && (
            <>
              <CustomButton
              value="Respond"
                className="gray_btn btns"
                onClick={() => setRespondMenu((perv) => !perv)}
              >
              </CustomButton>
              {respondMenu && requestStatus?.requestReceived && (
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
