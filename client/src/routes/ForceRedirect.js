import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ForceRedirect = ({ children }) => {
 const { token , status} = useSelector((state) => state.auth);

  if (status==="isConnected" ||token) {
    return <Navigate to="/" replace/>;
  }
  return children;
};

export default ForceRedirect;
