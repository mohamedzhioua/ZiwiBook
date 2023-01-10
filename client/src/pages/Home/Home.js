import React, { useEffect, useState } from "react";
import { fetchPosts, reset } from "../../app/features/memorie/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import Search from "../../components/SearchBar/Search";
import CustomButton from "../../components/CustomButton/CustomButton";
import { openModal } from "../../app/features/modal/modalSlice";

function Home() {
  const [wordEntered, setWordEntered] = useState("");
  const { posts, message, fulfilled, isLoading } = useSelector(
    (state) => state.post
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const FilterQuery = (e) => {
    const wordEntered = e.target.value.trim();
    setWordEntered(wordEntered);
  };
  useEffect(() => {
    message && toast.success(message, { position: toast.POSITION.TOP_RIGHT });
    if (!isLoading && fulfilled) {
      dispatch(reset());
    }
  }, [message, fulfilled, dispatch, isLoading]);

  return (
    <>
      <div
        className="container"
        style={{ marginTop: "10px", marginBottom: "40px" }}
      >
        <div class="row">
          <div class="col-md-8">
            <Search onChange={FilterQuery} />
          </div>
          <div class="col-6 col-md-4">
            <CustomButton
              className="button2"
              value="add Memorie"
              onClick={() => dispatch(openModal({ name: "AddEditForm" }))}
            />
          </div>
        </div>
        {!posts.length ? (
          <h1 className="text-center">
            No Memories Found!....You can Share One
          </h1>
        ) : (
          <div class="row g-3">
            {posts
              .filter((post) =>
                post.title?.toLowerCase().includes(wordEntered?.toLowerCase()))
              .map((post , index) => (
                <div class="col-12 col-md-6 col-lg-4" key={index}>
                  <Card post={post} userId={user._id} />
                </div>
              ))}
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
