import axios from "axios";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
//add post
const addPost = async (postData) => {
  const response = await axios.post("/post/addPost", postData, config);
  return response.data;
};

// fetch all posts
const fetchAll = async () => {
  const response = await axios.get("/post/getAllPost");
  return response.data;
};

// delete a post
const deleteOne = async (id) => {
  const response = await axios.delete(`/post/deletePost/${id}`);
  return response.data;
};

// update a post
const updatePost = async (id, form) => {
  const response = await axios.put(`/post/updatePost/${id}`, form, config);
  return response.data;
};

// Find a post by ID
const FindPost = async (id) => {
  const response = await axios.get(`/post/getOnePost/${id}`);
  return response.data;
};

// like  post 
const likePost = async(id)=>{
  const response = await axios.patch(`/post/like/${id}`)
  return response.data
}
// Comment  post 
const CommentPost = async(id,form)=>{
  const response = await axios.patch(`/post/Comment/${id}`, form)
  return response.data
}

const postService = {
  addPost,
  fetchAll,
  deleteOne,
  updatePost,
  FindPost,
  likePost,
  CommentPost,
};

export default postService;
