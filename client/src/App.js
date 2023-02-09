import { BrowserRouter } from "react-router-dom";

//Routes
import Router from "./routes/Router";

//Layouts
import { Header, Footer, ModalManager } from "./layouts/index";

//Styles
import "./index.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div style={{ marginTop: "80px", marginBottom: "45px" }}>
        <ModalManager />
        <Header />

        <Router />
        <Footer />
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
