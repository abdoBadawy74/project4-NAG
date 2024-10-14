import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import axios from "axios";
import { BaseURL, USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function RequireAuth() {
  const navigate = useNavigate();
  // user
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${BaseURL}/${USER}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        navigate("/login", { replace: true });
      });
  }, []);

  // cookie && token
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  //   token ? <Outlet /> : <Navigate to="/login" replace={true} />;

  //   check if the token is available or not
  return token ? (
    user === "" ? (
      <Loading />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
