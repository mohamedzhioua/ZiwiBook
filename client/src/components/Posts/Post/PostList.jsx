import Post from "./Post";
import React from "react";
const PostList = ({ posts, isVisitor }) => {
  return (
    <>
      {posts?.map((post) => (
        <React.Fragment key={post._id}>
          <Post post={post} isVisitor={isVisitor} />
        </React.Fragment>
      ))}
    </>
  );
}


export default PostList;
