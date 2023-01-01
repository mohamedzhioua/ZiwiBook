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

// delete a post
const deleteOne = async (id) =>{
  const response = await axios.delete(`/post/deletePost/${id}`)
  return response.data
}
// update a post 
const updatePost = async (form,id) =>{
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
     },
  }
   const response = await axios.put(`/post/updatePost/${id}`, form,config)
  return response.data
}

 const postService = {
  addPost,
  fetchAll,
  deleteOne,
  updatePost,
};

export default postService;
