import React from "react";

export default function Regiser() {
  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          placeholder="Enter your Name.."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="text"
          id="email"
          className="form-control"
          placeholder="Enter your Email.."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="text"
          id="password"
          className="form-control"
          placeholder="Enter your password.."
        />
      </div>
    </div>
  );
}
