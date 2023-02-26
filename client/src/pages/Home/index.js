import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPostIds } from "../../app/features/post/postSlice";

// Components
import { CreatPost, PostList, SearchBar } from "../../components";

// Styles
import "./index.css";

function Home() {
  const [wordEntered, setWordEntered] = useState("");
  const { user } = useSelector((state) => state.auth);

  //search User input
  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };

  const sortedPosts = useSelector(selectPostIds)
  return (
    <div className="home">
       <div className="home-middle">
        <div className="home-posts">
         <SearchBar onChange={FilterQuery} />
         <CreatPost user={user} />
          <PostList posts={sortedPosts} user={user} wordEntered={wordEntered} />
        </div>
      </div>
    </div>
  );
}

export default Home;
