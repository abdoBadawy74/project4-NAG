import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //   function handleSubmit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name,
        email,
        password,
        role,
      });
      console.log(res);
      window.location.replace("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }

    // ref
    const focus = useRef();

    // handle focus
    useEffect(() => {
      focus.current.focus();
    })

  //   console.log(name);
  //   console.log(email);

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <h2 className="my-3">Update User</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            ref={focus}
            placeholder="name..."
            value={name}
            onChange={(e) => setName(() => e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email.."
            value={email}
            onChange={(e) => setEmail(() => e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password.."
            required
            value={password}
            onChange={(e) => setPassword(() => e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(() => e.target.value)}
          >
            <option disabled value={""}>
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manager</option>
          </Form.Select>
        </Form.Group>

        <button
          className="btn btn-primary"
          disabled={
            name === "" || email === "" || role === "" || password === ""
              ? true
              : false
          }
        >
          Save Edits
        </button>
      </Form>
    </>
  );
}
