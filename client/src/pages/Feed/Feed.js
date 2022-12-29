import React, { useEffect } from "react";
import { fetchPosts } from "../../app/features/memorie/postSlice";
import { useDispatch, useSelector } from "react-redux";
 import Card from "../../components/Card/Card";

function Feed() {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch()
  console.log("🚀 ~ file: Feed.js:8 ~ Feed ~ posts", posts);
useEffect(()=>{
  dispatch(fetchPosts())
},[])
  return (
    <div className="container">
      {!posts.length ? (<h1 className="text-center">No Memories Found!....You can Share yours</h1>): (
      <div class="row g-3">
        {posts.map((post) => (
          <div class="col-12 col-md-6 col-lg-4">
            <Card
              id={post._id}
              title={post.title}
              body={post.body}
              image={post.image}
            />
          </div>
        ))}
      </div>
      ) }
    </div>
  );
}

export default Feed;
