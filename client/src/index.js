import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { extendedApiSlice } from "./app/features/post/postSlice";
import { CommentApiSlice } from "./app/features/comment/commentSlice";
import { reactionApiSlice } from "./app/features/reaction/reactionSlice";
import { usersApiSlice } from "./app/features/user/usersSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.dispatch(extendedApiSlice.endpoints.fetchPosts.initiate());
store.dispatch(CommentApiSlice.endpoints.fetchComments.initiate());
store.dispatch(reactionApiSlice.endpoints.fetchReactions.initiate());
store.dispatch(usersApiSlice.endpoints.fetchUsers.initiate());

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);
