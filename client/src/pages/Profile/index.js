import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  CreatPost,
  CustomButton,
  Friends,
  Friendship,
  Photos,
  PostList,
  PostSkeleton,
  ProfileCover,
  ProfileMenu,
  ProfilePhoto,
} from "../../components";

import style from "./profile.module.css";
import IconStyle from "../../styles/icons.module.css";
import { useFetchPostsByUserQuery } from "../../app/features/post/postSlice";
import { useFetchPhotosQuery } from "../../app/features/user/photosSlice";
import { useFetchUserProfileQuery } from "../../app/features/user/userProfileSlice";

function Profile() {
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { username } = useParams();
  const usernameID = username ? username : user?.username;
  const isVisitor = !(usernameID === user?.username);
  const { data } = useFetchUserProfileQuery(usernameID);
  const userdata = data?.data?.user;
  const userfriendsdata = data?.data?.friends;
  const userfriendshipdata = data?.data?.friendship;

  // const {
  //   data: friends = [],
  //   isLoading: friendsloading,
  //   isFetching: friendsIsFetching,
  // } = useFetchFriendsQuery();
  const {
    data: photosData = [],
    isLoading: photosloading,
    isFetching: photosIsFetching,
    isSuccess: photosIsSuccess,
  } = useFetchPhotosQuery(usernameID);
  const photosSkelton = photosloading || photosIsFetching;

  const {
    data: posts = [],
    isLoading: postsLoading,
    isFetching: postsIsFetching,
    isSuccess: postsIsSuccess,
    isError,
    error,
  } = useFetchPostsByUserQuery(usernameID);
  const postsSkelton = postsLoading || postsIsFetching;
  const postsSkeltonHide = postsIsSuccess && !postsLoading && !error;

  return (
    <div className={style.profile_container}>
      <div className={style.head}>
        <div className={style.head_container}>
          <div className={style.top_head}>
            <ProfileCover
              isVisitor={isVisitor}
              user={userdata}
              photosData={photosData?.data}
            />
            <div className={style.top_head_content}>
              <div className={style.photo_container}>
                <div className={style.photo}>
                  <img
                    src={userdata?.photo}
                    className={style.user_photo}
                    alt="..."
                  />
                  {!isVisitor && (
                    <>
                      <div
                        className={`${style.add_photo} small_circle hover1`}
                        onClick={() => setShowProfilePhoto((perv) => !perv)}
                      >
                        <i className={IconStyle.camera_filled_icon}></i>
                      </div>
                      {showProfilePhoto && (
                        <ProfilePhoto
                          setShowProfilePhoto={setShowProfilePhoto}
                          showProfilePhoto={showProfilePhoto}
                          photosData={photosData?.data}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className={style.profile_info}>
                <h2 className={style.user_name}>
                  {`${userdata?.firstName} ${userdata?.lastName}`}
                  <i
                    style={{ marginLeft: "10px" }}
                    className={IconStyle.confirmed_icon}
                  />
                </h2>
                <span className={style.friends}>50 friends</span>
              </div>
              {!isVisitor && (
                <div className={style.profile_btns}>
                  <CustomButton
                    className={`blue_btn btns`}
                    value="Add to story"
                  />
                  <CustomButton
                    className={`gray_btn btns`}
                    value="Edit profile"
                  />
                </div>
              )}
              {isVisitor && <Friendship userId={userdata?._id} userfriendshipdata={userfriendshipdata}/>}
            </div>
          </div>
          <div className={style.line}></div>

          <ProfileMenu />
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.footer_container}>
          <div className={style.details}>
            <div
              className={style.details_con}
              style={{
                top: "65px",
              }}
            >
              <Photos
                photosData={photosData?.data}
                photosSkelton={photosSkelton}
              />
              <Friends />
            </div>
          </div>
          <div className={style.posts}>
            {!isVisitor && <CreatPost user={userdata} />}
            {postsSkelton && <PostSkeleton />}

            {postsSkeltonHide && <PostList posts={posts?.ids} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
