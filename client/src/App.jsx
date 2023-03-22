import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { Footer, ModalManager } from "./layouts/index";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Portal from "./utils/Portal";
function App() {

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
