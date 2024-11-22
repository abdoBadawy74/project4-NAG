import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../Pagination/Pagination";

export default function TableComponent(props) {
  const user = props.currentUser || false;

  const start = (props.page - 1) * props.limit;
  const end = parseInt(start) + parseInt(props.limit);
  const final = props.data.slice(start, end);
  console.log(start);
  console.log(end);
  console.log(final);

  const headerShow = props.header.map((head, index) => (
    <th key={index}>{head.name}</th>
  ));
  console.log(props.data);

  const dataShow = final.map((data, index) => (
    <tr key={index}>
      <td>{data.id}</td>
      {props.header.map((item, index) => (
        <td key={index}>
          {item.key === "image" ? (
            <img src={data[item.key]} alt="img" width={"60px"} />
          ) : item.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {data[item.key].map((img, index) => (
                <img key={index} src={img.image} alt="img" width={"60px"} />
              ))}
            </div>
          ) : // {/* show role of user upon check of number given from backend or show the value of this attr */}
          data[item.key] === "1995" ? (
            "admin"
          ) : data[item.key] === "2001" ? (
            "User"
          ) : data[item.key] === "1996" ? (
            "Writer"
          ) : data[item.key] === "1999" ? (
            "Product Manager"
          ) : (
            data[item.key]
          )}
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
    <>
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
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option>Open this menu</option>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </Form.Select>
        </div>

        <PaginatedItems
          itemsPerPage={props.limit}
          setPage={props.setPage}
          data={props.data}
          className="m-0"
        />
      </div>
    </>
  );
}
