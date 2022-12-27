import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { Loader } from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/features/auth/authSlice";
import CustomButton from "../../components/CustomButton/CustomButton";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
 const { email, password } = form;
// eye show hide handler
 const [passwordVisible, setPasswordVisible] = useState(password);
 const Eye =()=>{
   setPasswordVisible(!passwordVisible)
 }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, token, isLoading, isConnected } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isConnected || token) {
      navigate("/");
    }
  }, [error, token, isLoading, dispatch, isConnected]);


  //onChangeHandler
  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  //onsubmitHandler
  const onsubmitHandler = (event) => {
    event.preventDefault();
    dispatch(login(form));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div class="login-container">
      <div class="login-card">
        <div class="d-flex justify-content-center">
          <h1>
            <FaSignInAlt /> Sing In
          </h1>
        </div>
        <form onSubmit={onsubmitHandler}>
          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error.email}
            placeholder="Email"
            value={email}
            float // to make the label floating
          />

          <CustomInput
            name="password"
            label="password"
            onChange={onChangeHandler}
            error={error.password}
            placeholder="password"
            value={password}
            float // to make the label floating
            type={passwordVisible ? 'text' : 'password'} 
            onClick={Eye}           
            />
          <CustomButton className="button" type="submit" value="submit" />
        </form>
        <div class="text-center">
          <p>
            Not a member?
            <Link to="/signup" class="fw-bold text-body">
              <u className="Link"> Register</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
