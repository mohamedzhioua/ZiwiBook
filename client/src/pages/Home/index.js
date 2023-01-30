import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// features
 import { openModal } from "../../app/features/modal/modalSlice";

// Components
import { CustomButton, PostList, SearchBar } from "../../components";

// Styles
import "./index.css";

function Home() {
  const [wordEntered, setWordEntered] = useState("");

  const dispatch = useDispatch();

  //search User input
  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };

  // sorting posts by time created at
  const  sortedPosts  = useSelector((state) => state.posts.posts).slice()
  ?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <SearchBar onChange={FilterQuery} />
        </div>
        <div className="col-6 col-md-4">
          <CustomButton
            className="button2"
            value="add Memorie"
            onClick={() => dispatch(openModal({ name: "AddEditPost" }))}
          />
        </div>
      </div>
      <PostList posts={sortedPosts}  wordEntered={wordEntered} />
    </div>
  );
}

export default Home;
