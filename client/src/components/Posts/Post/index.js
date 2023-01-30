import React from "react";
import Post from "./Post";
import "./index.css";

const PostList = ({ posts, wordEntered }) => {
  
  if (posts?.length === 0) {
    return (
      <h1 className="text-center">No Memories Found!....You can Share One</h1>
    );
  } else {
    return (
      <div className="row">
        {posts
          ?.filter((post) =>
            post.text?.toLowerCase().includes(wordEntered?.toLowerCase())
          )
          ?.map((post) => (
            <div className="col-12 col-md-6 col-lg-4" key={post._id}>
              <Post post={post} />
            </div>
          ))}
      </div>
    );
  }
};

export default PostList;
