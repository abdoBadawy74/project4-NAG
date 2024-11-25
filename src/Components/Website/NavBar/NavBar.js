import React from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBar() {
  return (
    <nav className="py-3">
      <Container>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <Link to="/" className="col-3">
            <img
              src={require("../../../images/logo.png")}
              alt="logo"
              width="200px"
            />
          </Link>
          <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
            <Form.Control
              className="form-control custom-serach py-3 rounded-0"
              placeholder="Search Product"
              type="search"
            ></Form.Control>

            <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 rounded-0 d-flex align-items-center justify-content-center">
              Search
            </h3>
          </div>

          <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
            <Link to="/cart" className="text-secondary">
              <FontAwesomeIcon icon={faCartShopping} />
            </Link>
            <Link
              to="/profile"
              className="px-2 py-1 border rounded-circle text-secondary"
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
}