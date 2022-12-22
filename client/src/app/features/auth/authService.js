import axios from "axios";

//Register user
const register = async (userData) => {
  const response = await axios.post("/user/signup", userData);
  return response.data;
};

const authService = { register };
export default authService;
