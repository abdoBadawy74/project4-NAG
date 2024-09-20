import axios from "axios";
import React, { useState } from "react";
import { BaseURL, LOGIN } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function Login() {
  // States for the form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
      await axios.post(`${BaseURL}/${LOGIN}`, form).then((res) => {
        console.log(res);
        setLoading(false);
        // window.location.pathname = "/";
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 401) {
        setError("Wrong Email or Password");
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
            <h1 className="text-center">Login Now</h1>
            <div className="custom-form">
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
