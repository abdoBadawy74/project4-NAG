import axios from "axios";
import React, { useState } from "react";
import { BaseURL, LOGIN } from "../../Api/Api";

export default function Login() {
  // States for the form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Function to handle form change
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Function to handle form submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(form);
    try {
      await axios
        .post(`${BaseURL}/${LOGIN}`, form)
        .then((res) => {
          console.log(res);
          alert("User Registered Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div onSubmit={handleFormSubmit} className="container">
      <form className="w-75 m-auto mt-5">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your Email.."
            value={form.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password.."
            value={form.password}
            onChange={handleFormChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
