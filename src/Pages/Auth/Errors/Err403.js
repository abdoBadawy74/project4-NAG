import React from "react";
import { Link } from "react-router-dom";

export default function Err403({ role }) {
  return (
    <div className="text-center mt-5 w-100">
      <h1
        className="text-danger mt-5"
        style={{
          fontSize: "100px",
          fontWeight: "bold",
        }}
      >
        403 - ACCESS DENIED
      </h1>

      <p
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#35478c",
        }}
      >
        oops, You don't have permission to access this page.
      </p>
      <Link className="btn btn-primary w-75" to={role === "1996" ? "/dashboard/writer":"/"}>
        Return To {role === "1996" ? "Writer Page" : "Home Page"}
      </Link>
    </div>
  );
}
