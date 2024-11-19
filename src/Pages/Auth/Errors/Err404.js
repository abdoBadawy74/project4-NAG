import React from "react";
import { Link } from "react-router-dom";

export default function Err404() {
  return (
    <div className="text-center mt-5 w-100">
      <h1
        className="text-danger mt-5"
        style={{
          fontSize: "100px",
          fontWeight: "bold",
        }}
      >
        404 - PAGE NOT FOUND
      </h1>

      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#35478c",
        }}
      >
        oops, the page you are looking for might have been removed or its name
        has been changed.
      </p>

      <Link className="btn btn-primary w-75" to="/">
        Return To Home Page
        </Link>
    </div>
  );
}
