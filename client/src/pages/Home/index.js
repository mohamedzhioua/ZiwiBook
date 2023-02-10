import React, { useState } from "react";
import { useSelector } from "react-redux";

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

  // sorting posts by time created at
  const sortedPosts = useSelector((state) => state.posts.posts)
    .slice()
    ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="home">
      <div className="home-head">
        <div className="home-column">
          <SearchBar onChange={FilterQuery} />
        </div>
        <div className="home-column">
          <CreatPost />
        </div>
      </div>
      <div className="home-middle">
        <div className="posts">
          <PostList posts={sortedPosts} user={user} wordEntered={wordEntered} />
        </div>
      </div>
    </div>
  );
}

export default Home;
