import axios from "axios";

//Register user
const register = async (userData) => {
  const response = await axios.post("/user/signup", userData);
  return response.data;
};



//Login user
const login =async(userData)=>{
  const response = await axios.post("user/signin",userData)
  if(response.data){
    localStorage.setItem('token', JSON.stringify(response.data.token))
  }
  return response.data 
  
}

//Logout user
const logout = async()=>{
  const response = await axios.get("user/logout")
  return response.data
}


const authService = { register , login , logout };
export default authService;