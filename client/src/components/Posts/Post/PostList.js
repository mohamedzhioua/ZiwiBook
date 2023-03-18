import React from "react";
import Post from "./Post";

const PostList = ({ posts ,isVisitor}) => {

    return (
      <>         
        { posts?.map((postId) => (
            <React.Fragment key={postId}>
              <Post  postId={postId} isVisitor={isVisitor} />
            </React.Fragment>
          ))}
      </>
    );
  }


export default PostList;
