import { useSelector } from "react-redux";
import { useFetchPostsQuery } from "../../app/features/post/postApi";
import * as component from "../../components";
import style from "./home.module.css";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { isLoading, isFetching, isSuccess, isError, error } = useFetchPostsQuery("fetchPosts")
  const { sortedPosts } = useFetchPostsQuery("fetchPosts", {
    selectFromResult: ({ data }) => ({
      sortedPosts: data?.ids.map(id => data?.entities[id])
    }),
  })

  const postSkeleton = isFetching || isLoading;
  const hidePostSkeleton = isSuccess && !isLoading && !error && sortedPosts

  return (
    <div className={style.home_container}>
      <div className={style.home_middle}>
        <component.CreatPost />
        <div className={style.home_posts}>
          {postSkeleton && (
            <>
              <component.PostSkeleton />
              <component.PostSkeleton />
              <component.PostSkeleton />
            </>
          )}
          {hidePostSkeleton && (
            <component.PostList
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
