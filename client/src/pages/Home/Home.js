import React, { useEffect, useState } from "react";
import { fetchPosts} from "../../app/features/memorie/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
//   const[input,setInput]=useState('')

function Home() {
  const[input,setInput]=useState('')
  const { posts} = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // let location = useLocation();
  // console.log("🚀 ~ file: Home.js:15 ~ Home ~ location", location)
  // const { input} = location.state;
  // console.log("🚀 ~ file: Home.js:17 ~ Home ~ input", input)
  useEffect(()=>{
    dispatch(fetchPosts());
  },[dispatch])

 

 

  return (
    <div
      className="container"
      style={{ marginTop: "10px", marginBottom: "40px" }}
    >
      {!posts.length ? (
        <h1 className="text-center">No Memories Found!....You can Share One</h1>
      ) : (
        <div class="row g-3">
          {posts
          .filter(post=>post.body.includes(input) || post.title.includes(input))
          .map((post) => (
            <div class="col-12 col-md-6 col-lg-4" key={post._id}>
              <Card post={post} userId={user._id} />
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Home;
