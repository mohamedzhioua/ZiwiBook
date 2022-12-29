import axios from "axios";

//add post
const addPost = async (postData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
     },
  }
 
  const response = await axios.post("/post/addPost", postData,config);
  return response.data;
};

// fetch all posts
const fetchAll = async () =>{
  const response = await axios.get("/post/getAllPost")
  return response.data
}

const postService = {
  addPost,
  fetchAll,
};

export default postService;
