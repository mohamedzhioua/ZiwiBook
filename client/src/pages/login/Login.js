import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { Loader } from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/features/auth/authSlice";
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const {email, password } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {token, error, message, isLoading  } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token||message) {
      window.location.reload(false);
      navigate("/");

    }
  }, [error, message, isLoading, token, navigate, dispatch]);

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
    <div class="container">
      <div class="signup-card">
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
        />

        <CustomInput
          type="text"
          name="password"
          label="password"
          onChange={onChangeHandler}
          error={error.password}
          placeholder="password"
          value={password}
        />

        <button
          type="submit"
          class="btn btn-primary btn-lg btn-block mb-4 Login"
        >
          Sign in
        </button>
        </form>
        <div class="text-center">
          <p>
            Not a member?
            <Link to="/signup" class="fw-bold text-body">
              <u className="link"> Register</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
