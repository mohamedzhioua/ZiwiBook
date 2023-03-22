import React from "react";
import { Link, useParams } from "react-router-dom";
import classes from "./style.module.css";
import Skeleton from "react-loading-skeleton";
import ICONStyle from "../../styles/icons.module.css"
import { FriendCard } from "../../components/index.jsx";
import { useFetchFriendsQuery } from "../../app/features/user/userProfileApi";

function FriendsPage() {
  const { type } = useParams();

  const {
    data: friends,
    isLoading,
    isFetching,
    isSuccess,
  } = useFetchFriendsQuery();

  const friendsSkelton = isLoading || isFetching;

  return (
    <>
      <div className={classes.friends_container}>
        <div></div>
        <div className={classes.left}>
          <div className={classes.header}>
            <h3>Friends</h3>
            <div className="small_circle">
              <i className={ICONStyle.settings_filled_icon}></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <Link
              to="/friends"
              className={`${classes.menu_item} hover2 ${type === undefined && classes.active_friends
                }`}
            >
              <div className="small_circle">
                <i className={ICONStyle.friends_home_icon}></i>
              </div>
              <span>Home</span>
              <div className={classes.rArrow}>
                <i className={ICONStyle.right_icon}></i>
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`${classes.menu_item} hover2 ${type === "requests" && classes.active_friends
                }`}
            >
              <div className="small_circle">
                <i className={ICONStyle.friends_requests_icon}></i>
              </div>
              <span>Friend Requests</span>
              <div className={classes.rArrow}>
                <i className={ICONStyle.right_icon}></i>
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`${classes.menu_item} hover2 ${type === "sent" && classes.active_friends
                }`}
            >
              <div className="small_circle">
                <i className={ICONStyle.friends_requests_icon}></i>
              </div>
              <span>Sent Requests</span>
              <div className={classes.rArrow}>
                <i className={ICONStyle.right_icon}></i>
              </div>
            </Link>
            <Link
              to="/friends/all"
              className={`${classes.menu_item} hover2 ${type === "all" && classes.active_friends
                }`}
            >
              <div className="small_circle">
                <i className={ICONStyle.all_friends_icon}></i>
              </div>
              <span>All Friends</span>
              <div className={classes.rArrow}>
                <i className={ICONStyle.right_icon}></i>
              </div>
            </Link>
            <div
              className={`${classes.menu_item} hover2 ${type === "all" && "active_friends"
                }`}
            >
              <div className="small_circle">
                <i className={ICONStyle.friends_suggestions_icon}></i>
              </div>
              <span>Suggestions</span>
              <div className={classes.rArrow}>
                <i className={ICONStyle.right_icon}></i>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.right}>
          {(type === undefined || type === "requests") && (
            <div className={classes.friends_right_wrap}>
              <div className={classes.friends_left_header}>
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link
                    to="/friends/requests"
                    className={`${classes.see_link} hover2`}
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className={classes.flex_wrap}>
                {friendsSkelton && (
                  <Skeleton className={classes.req_card} height={200} />
                )}
                {friends?.data?.recivedRequests &&
                  friends?.data?.recivedRequests.length > 0
                  ? friends?.data?.recivedRequests.map((request) => (
                    <FriendCard
                      user={request?.sender}
                      key={request?._id}
                      type="request"
                      requestID={request?._id}
                    />
                  ))
                  : isSuccess && !isLoading && <p>No friend requests</p>}
              </div>
            </div>
          )}
          {(type === undefined || type === "sent") && (
            <div className={classes.friends_right_wrap}>
              <div className={classes.friends_left_header}>
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link
                    to="/friends/sent"
                    className={`${classes.see_link} hover2`}
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className={classes.flex_wrap}>
                {friendsSkelton && (
                  <Skeleton className={classes.req_card} height={200} />
                )}
                {friends?.data?.sentRequests && friends?.data?.sentRequests.length > 0
                  ? friends?.data?.sentRequests.map((request) => (
                    <FriendCard
                      user={request?.recipient}
                      key={request?._id}
                      type="sent"
                      requestID={request?._id}
                    />
                  ))
                  : isSuccess && !isLoading && <p>No sent requests</p>}
              </div>
            </div>
          )}
          {(type === undefined || type === "all") && (
            <div className={classes.friends_right_wrap}>
              <div className={classes.friends_left_header}>
                <h3>Friends</h3>
                {type === undefined && (
                  <Link
                    to="/friends/all"
                    className={`${classes.see_link} hover2`}
                  >
                    See all
                  </Link>
                )}
              </div>
              <div className={classes.flex_wrap}>
                {friendsSkelton && (
                  <Skeleton className={classes.req_card} height={200} />
                )}
                {friends?.data.friendLists && friends?.data.friendLists.length > 0
                  ? friends?.data.friendLists.map((user) => (
                    <FriendCard user={user} key={user._id} type="friends" />
                  ))
                  : isSuccess && !isLoading && <p>No friends</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FriendsPage;
