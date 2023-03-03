import { useSelector } from "react-redux";
import {
  selectPostIds,
  useFetchPostsQuery,
} from "../../app/features/post/postSlice";
import { CreatPost, PostList, PostSkeleton,  } from "../../components";
import style from "./home.module.css";

function Home() {
  // const [wordEntered, setWordEntered] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isFetching, isSuccess, isError, error } = useFetchPostsQuery();
  const sortedPosts = useSelector(selectPostIds);
  const postSkeleton = isFetching || isLoading;
  const hidePostSkeleton = isSuccess && !isLoading && !error && sortedPosts

  //search User input
  // const FilterQuery = (e) => {
  //   const wordEntered = e.target.value.trim();
  //   setWordEntered(wordEntered);
  // };

  return (
    <div className={style.home_container}>
      <div className={style.home_middle}>
        <CreatPost user={user} />
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
              // wordEntered={wordEntered}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
