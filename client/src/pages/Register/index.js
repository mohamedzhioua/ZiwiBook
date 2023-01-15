import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// features
import { register, reset } from "../../app/features/auth/authSlice";

// Components
import { CustomButton, CustomInput, Loader } from "../../components";

// Styles
import { FaUser } from "react-icons/fa";
import "./index.css";

function Register() {
  const [form, setForm] = useState({});
  const { firstname, lastname, email, password } = form;
// eye show hide handler
const [passwordVisible, setPasswordVisible] = useState(password);
const Eye =()=>{
  setPasswordVisible(!passwordVisible)
}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, message, isLoading, isConnected } = useSelector(
    (state) => state.auth
  );

 
  useEffect(() => {
    if (isConnected || message) {
      navigate("/login");
      dispatch(reset());
  }
  },[error, message, isLoading, isConnected,  dispatch]);

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
    dispatch(register(form));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div class="signup-container">
      <div class="signup-card">
        <div class="d-flex justify-content-center">
          <h1>
            <FaUser /> Create an account
          </h1>
        </div>
        <form  onSubmit={onsubmitHandler}>
          <CustomInput
            type="text"
            name="firstname"
            label="firstname"
            onChange={onChangeHandler}
            error={error.firstname}
            placeholder="firstname"
            value={firstname}
            float // to make the label floating
          />

          <CustomInput
            type="text"
            name="lastname"
            label="lastname"
            onChange={onChangeHandler}
            error={error.lastname}
            placeholder="lastname"
            value={lastname}
            float // to make the label floating
          />

          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error.email}
            placeholder="email"
            value={email}
            float // to make the label floating
          />

          <CustomInput
             name="password"
            label="Password"
            onChange={onChangeHandler}
            error={error.password}
            placeholder="password"
            value={password}
            float // to make the label floating
            type={passwordVisible ? 'text' : 'password'} 
            onClick={Eye}           

           />
         <CustomButton
            className="button"
            type="submit"
            value="register"

          />
        </form>
        <div class="text-center">
          <p>
            Have already an account?{" "}
            <Link to="/" class="fw-bold text-body">
              <u className="Link">Login here</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register; 