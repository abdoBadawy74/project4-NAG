import React, { useEffect, useState } from "react";
import { USERS, USER } from "../../Api/Api";
import { Table } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);
  const [noUsers, setNoUsers] = useState(false);

  // get current user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get all users
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .then(() => {
        setNoUsers(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteUser]);


  // handle delete user function
  async function handleDelete(id) {

    if(currentUser.id === id){
      alert("You can't delete yourself");
      return;
    }
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setDeleteUser(!deleteUser);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">

    <div className="d-flex align-items-center justify-content-between my-3">
        <h2 className="text-center">Users</h2>
        <Link to="/dashboard/users/add" className="btn btn-primary">
          Add User
        </Link>
    </div>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr className="text-center fs-3">
              <td colSpan="12">Loading...</td>
            </tr>
          ) : users.length === 0 && noUsers ? (
            <tr className="text-center fs-3">
              <td colSpan="12">No Users Found !</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="p-0"
                style={{
                  lineHeight: "2.5",
                }}
              >
                <td>{user.id}</td>
                <td>{user.name === currentUser.name ? user.name+ " (You)":user.name }</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "1995"
                    ? "admin"
                    : user.role === "2001"
                    ? "User"
                    : "Writer"}
                </td>
                <td className="d-flex justify-content-center gap-4">
                  <Link to={`${user.id}`} className="btn btn-success">
                    Edit <FontAwesomeIcon icon={faPenToSquare} />
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
