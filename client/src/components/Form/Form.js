import React, { useState } from "react";
import "./Form.css";

const Form = ({ onChange, value, error }) => {
  const [picture, setPicture] = useState(null);

  const onChangePicture = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="blog-list-item">
      <h1 className="New-Post-Title">Share a Memorie</h1>
      <form className="New-Post-Form">
        <div class="mb-3">
          <label for="formFile" class="form-label">
            Title :
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="title..."
            name="title"
            onChange={onChange}
            value={value}
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
            onChange={onChangePicture}
            value={value}
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
            onChange={onChange}
            value={value}
          />
        </div>
        <div class="d-grid">
          <input className="btn btn-secondary" type="submit" value="Publish" />
        </div>
      </form>
    </div>
  );
};

export default Form;
