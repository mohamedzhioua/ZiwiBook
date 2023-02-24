import React from "react";
import Post from "./Post";
import "./index.css";

const PostList = ({ posts, wordEntered = "", user }) => {
  console.log("🚀 ~ file: index.js:6 ~ PostList ~ posts:", posts)
  if (posts?.length === 0) {
    return (
      <h1 className="text-center">No Memories Found!....You can Share One</h1>
    );
  } else {
    return (
      <>
        {posts
          ?.filter((post) =>
            post.text?.toLowerCase().includes(wordEntered?.toLowerCase())
          )
          ?.map((post) => (
            <React.Fragment key={post._id}>
              <Post post={post} user={user} />
            </React.Fragment>
          ))}
      </>
    );
  }
};

export default PostList;
