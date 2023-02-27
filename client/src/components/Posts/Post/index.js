import React from "react";
import Post from "./Post";
import "./index.css";

const PostList = ({ posts, wordEntered = "", user }) => {
  if (posts?.length === 0) {
    return (
      <h1 className="text-center">No Memories Found!....You can Share One</h1>
    );
  } else {
    return (
      <>
        {posts
          // ?.filter((post) =>
          //   post?.text?.toLowerCase().includes(wordEntered?.toLowerCase())
          // )
          ?.map((postId) => (
            <React.Fragment key={postId}>
              <Post  postId={postId} user={user} />
            </React.Fragment>
          ))}
      </>
    );
  }
};

export default PostList;
