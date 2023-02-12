import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//components
import {
  CreatPost,
  CustomButton,
  Friends,
  Photos,
  PostList,
  ProfileCover,
  ProfileMenu,
} from "../../components";

// Styles
import "./index.css";
import { BsCameraFill } from "react-icons/bs";

function Profile() {
  const [showProfilePhoto, setShowProfilePhoto] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { username } = useParams();

  const usernameID = username ? username : user.name;
  const isVisitor = !(usernameID === user.name);
  // sorting posts by time created at
  const sortedPosts = useSelector((state) =>
    state.posts.posts.filter((post) => post.owner.name === usernameID)
  )
    .slice()
    ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="profile">
      <div className="top">
        <div className="top-wrapper">
          <div className="header">
            <ProfileCover isVisitor={isVisitor} />
            <div className="header-content">
              <div className="photo_wrap">
                <div className="photo">
                  <img
                    src="https://img.freepik.com/premium-vector/portrait-young-man-with-beard-hair-style-male-avatar-vector-illustration_266660-423.jpg?w=2000"
                    className="profile-photo"
                    alt="..."
                  />
                  {!isVisitor && (
                    <>
                      <div
                        className="add_photo small_circle hover1"
                        onClick={() => setShowProfilePhoto((perv) => !perv)}
                      >
                        <BsCameraFill />
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
              <div className="profile-info">
                <h2 className="Name">zhioua mohamed</h2>
                <span className="friends">50 friends</span>
              </div>
              <div className="profile-btns">
                {isVisitor ? (
                  <>
                    <CustomButton
                      value="Add as A friend"
                      className="blue_btn"
                    />
                    <CustomButton className="gray_btn" value="Message" />
                  </>
                ) : (
                  <>
                    <CustomButton className="blue_btn" value="Add to story" />
                    <CustomButton className="gray_btn" value="Edit profile" />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="line"></div>

          <ProfileMenu />
        </div>
      </div>

      <div className="bottom-wrapper">
        <div className="details">
          <div className="details_con">
            <Photos />
            <Friends />
          </div>
        </div>
        <div className="posts-wrapper">
          <div className="posts">
            {!isVisitor && <CreatPost />}
            <PostList posts={sortedPosts} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
