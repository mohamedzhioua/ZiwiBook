import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { Footer, ModalManager } from "./layouts/index";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Portal from "./utils/Portal";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const theme = useSelector((state) => state.user.theme);
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
  return (
    <BrowserRouter>
      <ModalManager />
      <Router />
      <Footer />
      <Portal>
        <ToastContainer />
      </Portal>
    </BrowserRouter>
  )
}

export default App
