import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider} from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { fetchPosts } from "./app/features/post/postSlice";
import { fetchComments } from "./app/features/comment/commentSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(fetchPosts())
store.dispatch(fetchComments())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
