import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Website/Homepage";
import Login from "./Pages/Auth/Login";
import Regiser from "./Pages/Auth/Regiser";
import Users from "./Pages/Dashboard/Users";
import GoogleCallBack from "./Pages/Auth/GoogleCallBack";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Err403 from "./Pages/Auth/Err403";
import Writer from "./Pages/Dashboard/Writer";

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
        <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="users/add" element={<AddUser />} />
          </Route>
          <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
            <Route path="writer" element={<Writer />} />
          </Route>
        </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
