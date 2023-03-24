import { useSelector } from "react-redux";
import {  useFetchPostsQuery } from "../../app/features/post/postApi";
import { CreatPost, PostList, PostSkeleton } from "../../components";
import style from "./home.module.css";

function Home() {

  const { user } = useSelector((state) => state.user);
  const {data:sortedPosts, isLoading, isFetching, isSuccess, isError, error } = useFetchPostsQuery("fetchPosts");


  const postSkeleton = isFetching || isLoading;
  const hidePostSkeleton = isSuccess && !isLoading && !error && sortedPosts

  return (
    <div className={style.home_container}>
      <div className={style.home_middle}>
        <CreatPost />
        <div className={style.home_posts}>
          {postSkeleton && (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}
          {hidePostSkeleton && (
            <PostList
              posts={sortedPosts.ids}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
