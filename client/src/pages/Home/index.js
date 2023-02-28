import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPostIds,
  useFetchPostsQuery,
} from "../../app/features/post/postSlice";

// Components
import { CreatPost, PostList, PostSkeleton, SearchBar } from "../../components";

// Styles
import "./index.css";

function Home() {
  const [wordEntered, setWordEntered] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isFetching, isSuccess, isError, error } =
    useFetchPostsQuery();
  const postSkeleton = isFetching || isLoading;
const hidePostSkeleton = isSuccess && !isLoading && !error 
  //search User input
  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };

  const sortedPosts = useSelector(selectPostIds);
  return (
    <div className="home">
      <div className="home-middle">
        <div className="home-posts">
          <SearchBar onChange={FilterQuery} />
          <CreatPost user={user} />
          {(postSkeleton) && (
            <>
              <PostSkeleton />
              <PostSkeleton />

            </>
          )}
          {hidePostSkeleton && 
            <PostList
            posts={sortedPosts}
            postSkeleton={postSkeleton}
            hidePostSkeleton={hidePostSkeleton}
            user={user}
            wordEntered={wordEntered}
          />}
        </div>
      </div>
    </div>
  );
}

export default Home;
