import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TableComponent(props) {
  const user = props.currentUser || false;
  const headerShow = props.header.map((head, index) => (
    <th key={index}>{head.name}</th>
  ));
  console.log(props.data);

  const dataShow = props.data.map((data, index) => (
    <tr key={index}>
      <td>{data.id}</td>
      {props.header.map((item, index) => (
        <td key={index}>
           {
           item.key === "image" ? <img src={data[item.key]} alt="img" width={"60px"} />
           :
          // {/* show role of user upon check of number given from backend or show the value of this attr */}
          data[item.key] === "1995"
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
          onClick={() => props.delete(data.id)}
        >
          Delete <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  ));

  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>Id</th>
          {headerShow}
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {props.data.length === 0 && (
          <tr>
            <td colSpan={12}>
              {" "}
              <h2>Loading...</h2>
            </td>
          </tr>
        )}
        {dataShow}
      </tbody>
    </Table>
  );
}
