import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Website/Homepage";
import Login from "./Pages/Auth/Login";
import Regiser from "./Pages/Auth/Regiser";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regiser />} />
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />

        {/* private || protected routes */}
        <Route element={<RequireAuth/>}>
          <Route path="dashboard/*" element={<Dashboard />}>
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
