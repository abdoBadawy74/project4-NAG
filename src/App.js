import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Website/Home/Homepage";
import RequireBack from "./Pages/Auth/protecting/RequireBack";
import Login from "./Pages/Auth/AuthOperations/Login";
import Regiser from "./Pages/Auth/AuthOperations/Regiser";
import GoogleCallBack from "./Pages/Auth/AuthOperations/GoogleCallBack";
import Err404 from "./Pages/Auth/Errors/Err404";
import RequireAuth from "./Pages/Auth/protecting/RequireAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/User/Users";
import User from "./Pages/Dashboard/User/User";
import AddUser from "./Pages/Dashboard/User/AddUser";
import Categories from "./Pages/Dashboard/category/Categories";
import Category from "./Pages/Dashboard/category/Category";
import AddCategory from "./Pages/Dashboard/category/AddCategory";
import Products from "./Pages/Dashboard/product/Products";
import AddProducts from "./Pages/Dashboard/product/AddProduct";
import Writer from "./Pages/Dashboard/Writer";
import UpdateProduct from "./Pages/Dashboard/product/Product";
import WebsiteCategories from "./Components/Website/Categories/Categories";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/categories" element={<WebsiteCategories/>} />
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Regiser />} />
        </Route>
        <Route path="/auth/google/callback" element={<GoogleCallBack />} />
        <Route path="/*" element={<Err404 />} />

        {/* private || protected routes */}
        <Route element={<RequireAuth allowedRole={["1996", "1995", "1999"]} />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<User />} />
              <Route path="users/add" element={<AddUser />} />
            </Route>

            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<UpdateProduct />} />
              <Route path="product/add" element={<AddProducts />} />
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
