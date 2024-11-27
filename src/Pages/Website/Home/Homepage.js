import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";
import Product from "../../../Components/Website/Product/Product"
export default function Homepage() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between flex-wrap hand">
        <Container>
          <div className="col-lg-5 col-md-8 col-12 text-md-start text-center">
            <h1 className="display-2 fw-bold">Shampo Nice</h1>
            <h5 className="fw-normal">
              Another Nice Thing which is used by someone to make their hair
              look good.
            </h5>
            <Link
              to="/shop"
              className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light"
            >
              Shop Now
            </Link>
          </div>
        </Container>
      </div>
        <Product/>
    </>
  );
}
