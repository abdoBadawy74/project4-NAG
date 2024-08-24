import { useState } from "react";
import "./App.css";

function App() {
  // Set up form data
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
  });

  // Handle form change

  function handleFormChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  console.log(form);

  // Render Data
  return (
    <div className="App ">
      <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="pass"
            placeholder="password..."
            value={form.password}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPass" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            id="confirmPass"
            placeholder="confirm password..."
            value={form.confirmPassword}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            name="message"
            id="exampleFormControlTextarea1"
            rows={3}
            value={form.message}
            onChange={handleFormChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
