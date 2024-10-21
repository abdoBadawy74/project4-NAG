import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";

export default function TableComponent({ header, data, currentUser }) {
  const user = currentUser || false;
  const headerShow = header.map((head, index) => (
    <th key={index}>{head.name}</th>
  ));
  console.log(data);

  const dataShow = data.map((data) => (
    <tr key={data.id}>
      <td>{data.id}</td>
      {header.map((item, index) => (
        <td key={index}>
          {/* show role of user upon check of number given from backend or show the value of this attr */}
          {data[item.key] === "1995"
            ? "admin"
            : data[item.key] === "2001"
            ? "User"
            : data[item.key] === "1996"
            ? "Writer"
            : data[item.key] === "1999"
            ? "Product Manager"
            : data[item.key]}
          {user && data[item.key] === user.name ? " (You)" : ""}
        </td>
      ))}
      <td className="d-flex justify-content-center gap-4">
        <Link to={`${data.id}`} className="btn btn-success">
          Edit <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(data.id)}
        >
          Delete <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  ));

  // handle delete user function
  async function handleDelete(id) {
    if (currentUser.id === id) {
      alert("You can't delete yourself");
      return;
    }
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>Id</th>
          {headerShow}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>{dataShow}</tbody>
    </Table>
  );
}
