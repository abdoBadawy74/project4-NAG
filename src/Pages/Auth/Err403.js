import React from "react";

export default function Err403() {
  return (
    <div className="text-center mt-5 w-100">
      <h1 className="text-danger mt-5"
      style={{
        fontSize: "100px",
        fontWeight: "bold",
      }}>403 - ACCESS DENIED</h1>

      <p style={{
        fontSize: "28px",
        fontWeight: "bold",
        color:"#35478c"
      }}>oops, You don't have permission to access this page.</p>
    </div>
  );
}
