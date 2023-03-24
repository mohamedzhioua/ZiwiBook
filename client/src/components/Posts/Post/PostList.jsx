import Post from "./Post";
import React from "react";
const PostList = ({ posts, isVisitor }) => {
  return (
    <>
      {posts?.map((post) => (
        <div key={post._id}>
          <Post post={post} isVisitor={isVisitor} />
        </div>
      ))}
    </>
  );
}


export default PostList;
