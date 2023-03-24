import { useSelector } from "react-redux";
import {  useFetchPostsQuery } from "../../app/features/post/postApi";
import { CreatPost, PostList, PostSkeleton } from "../../components";
import style from "./home.module.css";

function Home() {

  const { user } = useSelector((state) => state.user);
  const {isLoading, isFetching, isSuccess, isError, error } = useFetchPostsQuery("fetchPosts")
  const {sortedPosts } = useFetchPostsQuery("fetchPosts", {
    selectFromResult: ({ data }) => ({
      sortedPosts: data?.ids.map(id => data?.entities[id])
    }),
  })
  console.log("🚀 ~ file: index.jsx:14 ~ Home ~ sortedPosts:", sortedPosts)

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
              posts={sortedPosts}
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
