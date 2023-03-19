import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { Footer, ModalManager } from "./layouts/index";
import "./index.css";
import { ToastContainer } from "react-toastify";
function App() {

  return (
    <BrowserRouter>
    <ModalManager />
    <Router />
    <Footer />
    <ToastContainer />
  </BrowserRouter>
  )
}

export default App
