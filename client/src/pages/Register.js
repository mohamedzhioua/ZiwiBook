import React, { useState } from "react";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import "../index.css";
import { Link } from "react-router-dom";
import CustomInput from "../components/CustomInput";

function Register() {
  const [form, setForm] = useState({});
  const [error, setError] = useState({
    name: "name required",
    Email: "format email required",
  });

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  console.log(form);
  return (
    <MDBContainer
      fluid
      className="d-flex align-items-center justify-content-center"
    >
      <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
        <MDBCardBody className="px-5">
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <form>
            <CustomInput
              type="text"
              name="name"
              label="Name"
              onChange={onChangeHandler}
              error={error.name}
              placeholder="name"
            />
            <CustomInput
              type="text"
              name="Email"
              label="Email"
              onChange={onChangeHandler}
              error={error.Email}
              placeholder="name"
            />
            <CustomInput
              type="password"
              name="password"
              label="Password"
              onChange={onChangeHandler}
              error={error.password}
              placeholder="name"
            />
            <MDBBtn className="mb-4 w-100 -4 Login" size="lg">
              Register
            </MDBBtn>
          </form>
        </MDBCardBody>
        <p class="text-center">
          Have already an account?{" "}
          <Link to="/login" class="fw-bold text-body">
            <u>Login here</u>
          </Link>
        </p>{" "}
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
