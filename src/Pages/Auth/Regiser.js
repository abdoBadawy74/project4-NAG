import axios from "axios";
import React, { useState } from "react";
import { BaseURL, REGISTER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";

export default function Regiser() {
  // States for the form
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
    // Cookies
    const cookie = Cookie();
  // State for error
  const [error, setError] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // Function to handle form change
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Function to handle form submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(form);
    try {
      await axios.post(`${BaseURL}/${REGISTER}`, form).then((res) => {
        console.log(res);
        setLoading(false);
        const token = res.data.token;
        cookie.set("e-commerce", token);
        window.location.pathname = "/";
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 422) {
        setError("Email already been taken");
      } else {
        setError("Internal Server Error");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row h-100">
          <form className="form " onSubmit={handleFormSubmit}>
            <h1 className="text-center">Register Now</h1>
            <div className="custom-form">
              <div className="form-control">
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Enter your Name.."
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
                <label htmlFor="name" className="form-label">
                  Name
                </label>
              </div>

              <div className="form-control">
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your Email.."
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
                <label htmlFor="email" className="form-label">
                  Email
                </label>
              </div>
              <div className="form-control">
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password.."
                  value={form.password}
                  onChange={handleFormChange}
                  required
                  minLength={6}
                />
                <label htmlFor="password" className="form-label">
                  Password
                </label>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
              {error && <p className="error">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
