import axios from "axios";

//add post
const addPost = async (postData) => {
  const response = await axios.post("/post/addPost", postData);
  return response.data;
};

const postService = {
  addPost,
};

export default postService;
