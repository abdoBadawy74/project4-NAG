import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const id = window.location.pathname.replace("/dashboard/users/", "");
  console.log(id);

  //   get user data

  useEffect(() => {
    Axios.get(`${USER}/${id}`)
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .finally(() => {
        setDisabled(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   function handleSubmit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/edit/${id}`, {
        name,
        email,
      });
      console.log(res);
      window.location.replace("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }

  //   console.log(name);
  //   console.log(email);

  return (
    <div>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <h2 className="my-3">Update User</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
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
        <button className="btn btn-primary" disabled={disabled}>
          Save Edits
        </button>
      </Form>
    </div>
  );
}
