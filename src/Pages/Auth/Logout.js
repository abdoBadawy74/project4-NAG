import axios from "axios";
import React from "react";
import { BaseURL, LOGOUT } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function Logout() {
  const cookie = Cookie();
  async function handleLogout() {
    try {
      const res = await axios.get(`${BaseURL}/${LOGOUT}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("e-commerce")}`,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={handleLogout}>Logout</button>;
}
