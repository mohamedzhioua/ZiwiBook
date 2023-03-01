import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectPostIds,
  useFetchPostsQuery,
} from "../../app/features/post/postSlice";
import { CreatPost, PostList, PostSkeleton, SearchBar } from "../../components";
import "./index.css";

function Home() {
  const [wordEntered, setWordEntered] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isFetching, isSuccess, isError, error } = useFetchPostsQuery();
  const sortedPosts = useSelector(selectPostIds);
  const postSkeleton = isFetching || isLoading;
  const hidePostSkeleton = isSuccess && !isLoading && !error && sortedPosts;

  //search User input
  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };

  return (
    <div className="home">
      <div className="home-middle">
        <div className="home-posts">
          <SearchBar onChange={FilterQuery} />
          <CreatPost user={user} />
          {postSkeleton && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          {hidePostSkeleton && (
            <PostList
              posts={sortedPosts}
              user={user}
              wordEntered={wordEntered}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
