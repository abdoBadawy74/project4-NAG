import React, { useEffect, useState } from "react";
import { CATEGORIES } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableComponent from "../../Components/Dashboard/TableComponent";

export default function Categories() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [deleteUser, setDeleteUser] = useState(false);
  const [noUsers, setNoUsers] = useState(false);

  // get all users
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
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

  // // handle delete user function
  // async function handleDelete(id) {

  //   if(currentUser.id === id){
  //     alert("You can't delete yourself");
  //     return;
  //   }
  //   try {
  //     const res = await Axios.delete(`${CATEGORIES}/${id}`);
  //     setDeleteUser(!deleteUser);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const header = ["Id", "Name", "Description"];

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between my-3">
        <h2 className="text-center">Categories Page</h2>
        <Link to="/dashboard/users/add" className="btn btn-primary">
          Add User
        </Link>
      </div>

      <TableComponent header={header} />
    </div>
  );
}
