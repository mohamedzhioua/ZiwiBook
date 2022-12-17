import Header from "./common/Navbar/Navbar";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <div >
      <Header />
       <h1>hello ziwi wiwi</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
