//components
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PostList, ProfileCover, ProfileInfo, ProfileMenu } from "../../components";

// Styles
import "./index.css";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { username } = useParams();

  const usernameID = username ? username : user.name;
  const isVisitor = !(usernameID === user.name);
    // sorting posts by time created at
    const  sortedPosts  = useSelector((state) => state.posts.posts.filter((post)=>post.owner.name === usernameID )).slice()
    ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    console.log("🚀 ~ file: index.js:17 ~ Profile ~ sortedPosts", sortedPosts)

  return (
    <div className="profile-container">
      <div className="profile">
        <ProfileCover />
        <div className="profile-info-menu-container">
          <ProfileInfo isVisitor={isVisitor} />
          <hr />
          <ProfileMenu />
        </div>
      </div>
      <PostList posts={sortedPosts} user={user}/>
    </div>
  );
}

export default Profile;
