import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";

export default function Product() {
  return (
    <Container>
      <h1>Deal of the day</h1>
      <div className="d-flex align-items-center justify-content-center flex-wrap">
        <div className="col-lg-3 col-md-6 col-12">
          <div className="m-1 border rounded p-3">
            <div className="border-bottom pb-3">
              <p style={{ color: "gray" }}>Medical gloves , sterilles</p>
              <p>lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
              <div className="position-relative px-5 py4">
                <p
                  className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                  style={{ width: "50px", height: "50px", lineHeight: "50px" }}
                >
                  Sale
                </p>
                <img
                  src={require("../../../images/upload.png")}
                  alt="product"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
              <div>
                <FontAwesomeIcon icon={solid} className="text-warning" />
                <FontAwesomeIcon icon={regular} className="text-warning" />
                <FontAwesomeIcon icon={regular} className="text-warning" />
                <FontAwesomeIcon icon={regular} className="text-warning" />
                <FontAwesomeIcon icon={regular} className="text-warning" />
              </div>
              <div className="d-flex align-items-center gap-3">
                <h5 className="m-0 text-primary">129$</h5>
                <h6
                  className="m-0"
                  style={{ color: "gray", textDecoration: "line-through" }}
                >
                  140$
                </h6>
              </div>
              <div className="border p-2 rounded">
                <img
                  src={require("../../../images/cart.png")}
                  alt="heart"
                  width={"30px"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
