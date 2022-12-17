import Header from "./common/Navbar/Navbar";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";

function App() {
  return (
    <BrowserRouter>
    <div >
      <Header />
      <Router/>
     </div>
    </BrowserRouter>
  );
}

export default App;
