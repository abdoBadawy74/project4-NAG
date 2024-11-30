import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import TitleSlice from "../../../Helpers/TitleSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonComp from "../Skeleton/SkeletonComp";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
  console.log(categories);

  const categoriesShow = categories.slice(-8).map((category) => (
    <p key={category.id} className="m-0">
      {TitleSlice(category.title, 0, 10)}
    </p>
  ));

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

        <div className="mt-3">
          <div className="d-flex justiy-content-start align-items-center gap-4">
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
  );
}
