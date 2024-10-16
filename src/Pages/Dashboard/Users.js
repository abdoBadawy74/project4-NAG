import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseURL, USERS } from "../../Api/Api";
import Cookie from "cookie-universal";
import { Table } from "react-bootstrap";

export default function Users() {
  const [users, setUsers] = useState([]);
  const cookie = Cookie();
  useEffect(() => {
    axios
      .get(`${BaseURL}/${USERS}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("e-commerce")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-white w-100 p-2">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="p-0"
              style={{
                lineHeight: "2.5",
              }}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-danger">Delete</button>
                <button className="btn btn-warning">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
