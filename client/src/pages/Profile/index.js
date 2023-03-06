import {useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  CreatPost,
  CustomButton,
  Friends,
  Photos,
  PostList,
  PostSkeleton,
  ProfileCover,
  ProfileMenu,
} from "../../components";

import style from "./profile.module.css";
import IconStyle from "../../styles/icons.module.css"
import { MdVerified } from "react-icons/md";
import {
  selectPostIds,
  useFetchPostsByUserQuery,
} from "../../app/features/post/postSlice";

function Profile() {
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { username } = useParams();

  const usernameID = username ? username : user?.username;
  const isVisitor = !(usernameID === user?.username);
  const sortedPosts = useSelector(selectPostIds);

  const {
    data,
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
            <ProfileCover isVisitor={isVisitor} user={user} />
            <div className={style.top_head_content}>
              <div className={style.photo_container}>
                <div className={style.photo}>
                  <img
                    src={user?.photo}
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
                      {/* {showProfilePhoto && (
                        <ProfilePhoto
                          setShowProfilePhoto={setShowProfilePhoto}
                          showProfilePhoto={showProfilePhoto}
                          pRef={pRef}
                          photosData={photosData?.data}
                        />
                      )} */}
                    </>
                  )}
                </div>
              </div>
              <div className={style.profile_info}>
                <h2 className={style.user_name}>
                  zhioua mohamed
                  <MdVerified
                    style={{
                      marginLeft: "10px",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                </h2>
                <span className={style.friends}>50 friends</span>
              </div>
              <div className={style.profile_btns}>
                {isVisitor ? (
                  <>
                    <CustomButton
                      value="Add as A friend"
                      className={`blue_btn btns`}
                    />
                    <CustomButton className={`gray_btn btns`} value="Message" />
                  </>
                ) : (
                  <>
                    <CustomButton
                      className={`blue_btn btns`}
                      value="Add to story"
                    />
                    <CustomButton
                     className={`gray_btn btns`}
                      value="Edit profile"
                    />
                  </>
                )}
              </div>
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
              <Photos />
              <Friends />
            </div>
          </div>
          <div className={style.posts}>
            {!isVisitor && <CreatPost user={user} />}
            {postsSkelton && <PostSkeleton />}
            {postsSkeltonHide && <PostList posts={sortedPosts} user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
