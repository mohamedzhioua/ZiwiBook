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

const postService = {
  addPost,
};

export default postService;
