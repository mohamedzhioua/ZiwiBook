import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { extendedApiSlice } from "./app/features/post/postSlice";
import { CommentApiSlice } from "./app/features/comment/commentSlice";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(extendedApiSlice.endpoints.fetchPosts.initiate());
store.dispatch(CommentApiSlice.endpoints.fetchComments.initiate());

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
