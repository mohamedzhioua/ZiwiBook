import React, { useEffect, useState } from "react";
import { fetchPosts} from "../../app/features/memorie/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";
import Search from "../../components/SearchBar/Search";
  
function Home() {
  const [wordEntered, setWordEntered] = useState("");
   const { posts} = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch(fetchPosts());
  },[dispatch])
 
const searchQuery =(e)=>{

    const wordEntered = e.target.value.trim()
    setWordEntered(wordEntered )
}

  return (
<>
<Search onChange={searchQuery}  />
    <div
      className="container"
      style={{ marginTop: "10px", marginBottom: "40px" }}
    >
      {!posts.length ? (
        <h1 className="text-center">No Memories Found!....You can Share One</h1>
      ) : (
        <div class="row g-3">
          {posts
          .filter(post=> post.title.toLowerCase().includes(wordEntered))
          .map((post) => (
            <div class="col-12 col-md-6 col-lg-4" key={post._id}>
              <Card post={post} userId={user._id} />
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div></>
  );
}

export default Home;
