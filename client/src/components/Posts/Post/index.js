import React from "react";
import Post from "./Post";
import "./index.css";
import FormLoader from "../../FormLoader";

const PostList = ({ posts,loading , wordEntered = "", user }) => {
  if (posts?.length === 0) {
    return (
      <h1 className="text-center">No Memories Found!....You can Share One</h1>
    );
  } else {
    return (
      <FormLoader loading={loading}>
        {posts
          // ?.filter((post) =>
          //   post?.text?.toLowerCase().includes(wordEntered?.toLowerCase())
          // )
          ?.map((postId) => (
            <React.Fragment key={postId}>
              <Post  postId={postId} user={user} />
            </React.Fragment>
          ))}
      </FormLoader>
    );
  }
};

export default PostList;
