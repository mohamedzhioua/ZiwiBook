import Post from "./Post";
import React from "react";
const PostList = ({ posts, isVisitor }) => {

  return (
    <>
      {posts?.map((postId) => (
        <React.Fragment key={postId}>
          <Post postId={postId} isVisitor={isVisitor} />
        </React.Fragment>
      ))}
    </>
  );
}


export default PostList;
