import axios from "axios";

//creat a Comment
const AddComment = async (id, text) => {
  const response = await axios.post(`/post/addComment/${id}`, { text });
  return response.data;
};

//Add Reply to a Comment
const addCommentReply = async (id, text) => {
  const response = await axios.post(`/post/addCommentReply/${id}`, { text });
  return response.data;
};

// fetch all Comments
const fetchComments = async () => {
  const response = await axios.get("/post/getComments");
  return response.data;
};

// Delete user Comment
const deleteComment = async (id) => {
  const response = await axios.delete(`/post/deleteComment/${id}`);
  return response.data;
};

// update user comment
const updateComment = async (id, text) => {
  const response = await axios.put(`/post/updateComment/${id}`, { text });
  return response.data;
};

// like  comment 
const likeComment = async (id) => {
  console.log("🚀 ~ file: commentService.js:35 ~ likeComment ~ id", id)
  const response = await axios.patch(`/post/Commentlike/${id}`);
  return response.data;
};
const commentService = {
  AddComment,
  addCommentReply,
  fetchComments,
  deleteComment,
  updateComment,
  likeComment,
};

export default commentService;
