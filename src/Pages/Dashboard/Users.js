import React, { useEffect, useState } from "react";
import { USERS } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  const [users, setUsers] = useState([]);

  // get all users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // handle delete user function

  const handleDelete = (id) => {};

  return (
    <div className="bg-white w-100 p-2">
      <Table striped bordered hover className="text-center">
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
              <td className="d-flex justify-content-center gap-4">
                <Link to={`${user.id}`} className="btn btn-success">
                  Edit <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
