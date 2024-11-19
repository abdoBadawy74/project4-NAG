import axios from "axios";
import React, { useEffect } from "react";
import { BaseURL, GOOGLE_CALLBACK } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import { Cookie } from "cookie-universal";

export default function GoogleCallBack() {
  const location = useLocation();
  const cookie = Cookie();
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${BaseURL}/${GOOGLE_CALLBACK}${location.search}`
        );
        console.log(res);
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (err) {
        console.log(err);
      }
    }

    GoogleCall();
  }, []);

  return <div>GoogleCallBack</div>;
}
