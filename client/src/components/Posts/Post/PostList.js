import React from "react";
import Post from "./Post";

const PostList = ({ posts}) => {

    return (
      <>         
        { posts?.map((postId) => (
            <React.Fragment key={postId}>
              <Post  postId={postId}  />
            </React.Fragment>
          ))}
      </>
    );
  }


export default PostList;
