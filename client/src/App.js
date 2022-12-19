import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Header from "./layouts/Header/Header";
import { Footer } from "./layouts/Footer/Footer";
 
function App() {
  return (
    <BrowserRouter>
        <Header/>
      <Router/>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;
