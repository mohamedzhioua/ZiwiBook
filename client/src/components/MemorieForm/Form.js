import { useState } from "react";
import "./Form.css";

const Form = ({ onsubmitHandler, onChangeHandler }) => {
  const [picture, setPicture] = useState(null);

  //displaying picture after upload handler
  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="blog-list-item">
      <h1 className="New-Post-Title">Share a Memorie</h1>
      <form className="New-Post-Form" onSubmit={onsubmitHandler}>
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Title :
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="title..."
            name="title"
            onChange={onChangeHandler}
          />
        </div>

        <div class="mb-3">
          <hr />
          <img
            id="output"
            src={picture && picture}
            alt="your_image"
            width="100"
            height="100"
          />
          <hr />
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            onChange={(e) => {
              onChangePicture(e);
              onChangeHandler(e);
            }}
          />
        </div>

        <div class="mb-3">
          <label for="formFile" class="form-label">
            description :{" "}
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="content...."
            name="body"
            onChange={onChangeHandler}
          />
        </div>
        <div class="d-grid">
          <input className="btn btn-secondary" type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
};

export default Form;
