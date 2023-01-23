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
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //search User input
  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };

  // sorting posts by time created at
  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

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
            onClick={() => dispatch(openModal({ name: "AddEditForm" }))}
          />
        </div>
      </div>
      <PostList posts={sortedPosts} user={user} wordEntered={wordEntered} />
    </div>
  );
}

export default Home;
