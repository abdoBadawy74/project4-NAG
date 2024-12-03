import { useContext, useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  faCartShopping,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import TitleSlice from "../../../Helpers/TitleSlice";
import SkeletonComp from "../Skeleton/SkeletonComp";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../Btns/PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const { isChange } = useContext(Cart);
  const [count, setCount] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  const handleDelete = (id) => {
    const filteredProduct = products.filter((product) => product.id !== id);
    setProducts(filteredProduct);
    localStorage.setItem("product", JSON.stringify(filteredProduct));
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const check = getProducts.find((product) => product.id === id);
    check.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };

  const cartShow = products.map((product) => (
    <div
      key={product.id}
      className=" my-2 border-bottom pb-2 position-relative"
    >
      <div
        className="position-absolute  end-0 rounded-circle d-flex align-items-center justify-content-center bg-danger text-white"
        style={{
          width: "20px",
          height: "20px",
          top: "-5px",
          cursor: "pointer",
        }}
        onClick={() => handleDelete(product.id)}
      >
        <FontAwesomeIcon icon={faXmark} width={10} />
      </div>
      <div className="d-flex align-items-center justify-content-between my-2 ">
        <img src={product.images[0].image} alt="product" width="50px" />
        <div>
          <p className="m-0">{product.title}</p>
          <p className="m-0">
            price before:{" "}
            <span
              style={{
                textDecoration: "line-through",
                color: "grey",
              }}
            >
              {product.price}$
            </span>{" "}
          </p>
        </div>
        <p className="m-0 text-primary fw-bold">{product.discount}$</p>
      </div>
      <PlusMinusBtn
        setCount={(data) => setCount(data)}
        count={product.count || 0}
        id={product.id}
        changeCount={changeCount}
      />
    </div>
  ));

  const categoriesShow = categories.slice(-8).map((category) => (
    <p key={category.id} className="m-0">
      {TitleSlice(category.title, 0, 10)}
    </p>
  ));

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{cartShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
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
              <div
                onClick={handleShow}
                className="text-secondary"
                style={{
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={faCartShopping} />
              </div>
              <Link
                to="/profile"
                className="px-2 py-1 border rounded-circle text-secondary"
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <div className="d-flex justiy-content-start align-items-center gap-4 flex-wrap">
              {loading ? (
                <>
                  <SkeletonComp
                    count={"8"}
                    height="20px"
                    baseColor="#eee"
                    style="col-lg-1 col-md-2 col-4 mx-2"
                  />
                </>
              ) : (
                categoriesShow
              )}
              <Link className="text-black category-link" to="/categories">
                Show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
