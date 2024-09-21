import axios from "axios";
import React, { useEffect } from "react";
import { BaseURL, USERS } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function Users() {
    const cookie = Cookie();
  useEffect(() => {
    axios
      .get(`${BaseURL}/${USERS}`,{
        headers: {
          Authorization: `Bearer ${cookie.get("e-commerce")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <div>Users page</div>;
}
