import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// features
import {
  fetchComments,
  fetchPosts,
  reset,
} from "../../app/features/post/postSlice";
import { openModal } from "../../app/features/modal/modalSlice";

// Components
import { CustomButton, Post, SearchBar } from "../../components";

// Styles
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function Home() {
  const [wordEntered, setWordEntered] = useState("");
  const { posts, message, fulfilled, isLoading } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    message && toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    if (!isLoading && fulfilled) {
      dispatch(reset());
    }
  }, [message, fulfilled, dispatch, isLoading]);

  //search User input
  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };

  // sorting posts by time created at
  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  // posts displayed in home page
  const Content = () => {
    if (!posts.length) {
      return (
        <h1 className="text-center">No Memories Found!....You can Share One</h1>
      );
    } else {
      return (
        <div class="row g-3">
          {sortedPosts
            .filter((post) =>
              post.text?.toLowerCase().includes(wordEntered?.toLowerCase())
            )
            .map((post, index) => (
              <div class="col-12 col-md-6 col-lg-4" key={index}>
                <Post post={post} userId={user._id} />
              </div>
            ))}
        </div>
      );
    }
  };

  return (
    <div className="container">
      <div class="row">
        <div class="col-md-8">
          <SearchBar onChange={FilterQuery} />
        </div>
        <div class="col-6 col-md-4">
          <CustomButton
            className="button2"
            value="add Memorie"
            onClick={() => dispatch(openModal({ name: "AddEditForm" }))}
          />
        </div>
      </div>
      <Content />
      <ToastContainer />
    </div>
  );
}

export default Home;
