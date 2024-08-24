import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Website/Homepage";
import Login from "./Pages/Auth/Login";
import Regiser from "./Pages/Auth/Regiser";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiser />} />
      </Routes>
    </div>
  );
}

export default App;
