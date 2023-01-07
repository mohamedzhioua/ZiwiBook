import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Header from "./layouts/Header/Header";
import  Footer  from "./layouts/Footer/Footer";
import Modal from "./layouts/Modal/Modal";
 
function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Modal/>
        <Header/>
      <Router/>
      <Footer/>
      </div>
      </BrowserRouter>
  );
}

export default App;
