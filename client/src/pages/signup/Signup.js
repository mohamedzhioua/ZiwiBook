import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import CustomInput from "../../components/CustomInput/CustomInput";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../../app/features/auth/authSlice";
import { Loader } from "../../components/Loader/Loader";
import CustomButton from "../../components/CustomButton/CustomButton";

function Register() {
  const [form, setForm] = useState({});
  const { firstname, lastname, email, password } = form;

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
            float
          />

          <CustomInput
            type="text"
            name="lastname"
            label="lastname"
            onChange={onChangeHandler}
            error={error.lastname}
            placeholder="lastname"
            value={lastname}
            float
          />

          <CustomInput
            type="text"
            name="email"
            label="Email"
            onChange={onChangeHandler}
            error={error.email}
            placeholder="email"
            value={email}
            float
          />

          <CustomInput
            type="password"
            name="password"
            label="Password"
            onChange={onChangeHandler}
            error={error.password}
            placeholder="password"
            value={password}
            float
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
