import axios from "axios";
import React, { useState } from "react";
import { BaseURL, LOGIN } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import "../../Css/Components/googl.css";
import google from "../../images/googl.png";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // States for the form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Cookies
  const cookie = Cookie();

  // State for error
  const [error, setError] = useState("");

  // loading state
  const [loading, setLoading] = useState(false);

  // Function to handle form change
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        const token = res.data.token;
        cookie.set("e-commerce", token);
        navigate("/dashboard", { replace: true });
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
        <div
          className="row"
          style={{
            height: "100vh",
          }}
        >
          <Form className="form" onSubmit={handleFormSubmit}>
            <h1 className="my-4">Login Now</h1>
            <div className="custom-form">
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your Email.."
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
                <Form.Label>Email </Form.Label>
              </Form.Group>

              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2  "
              >
                <Form.Control
                  type="password"
                  // id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password.."
                  value={form.password}
                  onChange={handleFormChange}
                  required
                  minLength={6}
                />
                <Form.Label>Password </Form.Label>
              </Form.Group>

              <button type="submit" className="btn btn-success">
                Login
              </button>

              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src={google}
                      alt="google-icon"
                      width={42}
                      height={42}
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>

              {error && <p className="error">{error}</p>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
