import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as component from "../../components";
import classes from "../../components/Profile/ProfileCover/cover.module.css";
import style from "./profile.module.css";
import IconStyle from "../../styles/icons.module.css";
import { useFetchPostsByUserQuery } from "../../app/features/post/postApi";
import { useFetchPhotosQuery } from "../../app/features/user/photosApi";
import { useFetchUserProfileQuery } from "../../app/features/user/userProfileApi";
import Skeleton from "react-loading-skeleton";

function Profile() {
  const [showProfilePhoto, setShowProfilePhoto] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const { username } = useParams();
  const photoRef = React.useRef(null);
  const navigate = useNavigate();
  const usernameID = username ? username : user?.username;
  const isVisitor = !(usernameID === user?.username);
  //user profileData
  const {
    data,
    isLoading: Profileloading,
    isFetching: ProfileIsFetching,
    isError: ProfileIsError,
  } = useFetchUserProfileQuery(usernameID);
  const userdata = data?.data?.user;
  const userfriendsdata = data?.data?.friends;
  const userfriendshipdata = data?.data?.friendship;
  const userdataSkelton = Profileloading || ProfileIsFetching;
  //user photosData
  const {
    data: photosData,
    isLoading: photosloading,
    isFetching: photosIsFetching,
    isSuccess: photosIsSuccess,
    isError: photosIsError,
  } = useFetchPhotosQuery(usernameID);
  const photosSkelton = photosloading || photosIsFetching;

  // user postsData
  const {
    isLoading: postsLoading,
    isFetching: postsIsFetching,
    isSuccess: postsIsSuccess,
    isError: postsIsError,
    error,
  } = useFetchPostsByUserQuery(usernameID)
  const { profilePostsData } = useFetchPostsByUserQuery(usernameID, {
    selectFromResult: ({ data }) => ({
      profilePostsData: data?.ids.map(id => data?.entities[id])
    }),
  })

  const postsSkelton = postsLoading || postsIsFetching;
  const postsSkeltonHide = postsIsSuccess && !postsLoading && !error;

  React.useEffect(() => {
    if (ProfileIsError || postsIsError) {
      navigate("/404");
    }
  }, [ProfileIsError, postsIsError, photosIsError]);

  return (
    <div className={style.profile_container}>
      <div className={style.head}>
        <div className={style.head_container}>
          <div className={style.top_head}>
            {userdataSkelton ? (
              <Skeleton className={classes.coverContainer} />
            ) : (
              <component.ProfileCover
                isVisitor={isVisitor}
                user={userdata}
                photosData={photosData?.data}
              />
            )}
            <div className={style.top_head_content}>
              <div className={style.photo_container}>
                <div className={style.photo}>
                  {userdataSkelton ? (
                    <Skeleton
                      width="160px"
                      height="160px"
                      circle
                      containerClassName="avatar-skeleton"
                    />
                  ) : (
                    <img
                      src={userdata?.photo}
                      className={style.user_photo}
                      alt={userdata?.firstName}
                      ref={photoRef}
                    />
                  )}
                  {!isVisitor && (
                    <>
                      <div
                        className={`${style.add_photo} small_circle hover1`}
                        onClick={() => setShowProfilePhoto((perv) => !perv)}
                      >
                        <i className={IconStyle.camera_filled_icon}></i>
                      </div>
                      {showProfilePhoto && (
                        <component.ProfilePhoto
                          photoRef={photoRef}
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
                <span
                  className={style.friends}
                >{`${userfriendsdata?.length} friends`}</span>
              </div>
              {!isVisitor && (
                <div className={style.profile_btns}>
                  <component.CustomButton
                    className={`blue_btn btns`}
                    value="Add to story"
                  />
                  <component.CustomButton
                    className={`gray_btn btns`}
                    value="Edit profile"
                  />
                </div>
              )}
              {isVisitor && (
                <component.Friendship
                  userId={userdata?._id}
                  userfriendshipdata={userfriendshipdata}
                  usernameID={usernameID}
                />
              )}
            </div>
          </div>
          <div className={style.line}></div>

          <component.ProfileMenu />
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
              <component.Photos
                photosData={photosData?.data}
                photosSkelton={photosSkelton}
              />
              <component.Friends
                userfriendsdata={userfriendsdata}
                photosSkelton={photosSkelton}
              />
            </div>
          </div>
          <div className={style.posts}>
            {!isVisitor && <component.CreatPost user={userdata} />}
            {postsSkelton && <component.PostSkeleton />}
            {postsSkeltonHide && <component.PostList posts={profilePostsData} isVisitor={isVisitor} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
