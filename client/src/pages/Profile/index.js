//components
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CreatPost,
  Friends,
  Photos,
  PostList,
  ProfileCover,
  ProfileInfo,
  ProfileMenu,
} from "../../components";

// Styles
import "./index.css";

function Profile() {
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
            <ProfileCover />
            <ProfileInfo isVisitor={isVisitor} />
            <hr />
          </div>
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
