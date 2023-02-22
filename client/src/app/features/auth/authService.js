import axios from "axios";
const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
//Register user
const register = async (userData) => {
  const response = await axios.post("/user/signup", userData);
  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post("user/signin", userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }
  return response.data;
};

//Logout user
const logout = async () => {
  const response = await axios.get("user/logout");
  return response.data;
};
//updateCoverPhoto 
const updateCoverPhoto = async (data) => {
  console.log("🚀 ~ file: authService.js:30 ~ updateCoverPhoto ~ data:", data)
  const response = await axios.post("/user/update/profile/cover", data,config);
  return response.data;
};

const authService = { register, login, logout , updateCoverPhoto};
export default authService;
