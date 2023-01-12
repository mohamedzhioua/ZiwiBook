import { BrowserRouter } from "react-router-dom";

//Routes
import Router from "./routes/Router";

//Layouts
import { Modal, Header, Footer } from "./layouts/index";

//Styles
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div style={{ marginTop: "90px", marginBottom: "45px" }}>
        <Modal />
        <Header />

        <Router />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
