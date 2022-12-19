import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import "../index.css";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";

function Home() {
  const [form, setForm] = useState({});
  const [error, setError] = useState({ name: "rrzarzaer" });

  const onChangeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  console.log(form);
  return (
    <div class="container py-5 h-100">
      <form>
        <CustomInput
          type="text"
          name="name"
          label="Name"
          onChange={onChangeHandler}
          error={error.name}
          placeholder="name"
         />
      </form>
    </div>
  );
}

export default Home;
