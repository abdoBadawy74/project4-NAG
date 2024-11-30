import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import TitleSlice from "./../../../Helpers/TitleSlice";

export default function Product(props) {
  const { product } = props;
  const stars = Math.min(Math.round(product.rating), 5);
  const goldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} className="text-warning" />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regular} />
  ));
  return (
    <div className="col-lg-3 col-md-6 col-12 ">
      <div className="m-1 border rounded p-3 h-100">
        <div className="border-bottom pb-3">
          <p style={{ color: "gray" }}>{TitleSlice(product.title, 0, 15)}</p>
          <p>{TitleSlice(product.title, 0, 30)}</p>
          <div className="position-relative px-5 py4">
            {product.discount && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            <img src={product.images[0].image} alt="product" height={"200px"} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {goldStars}
            {emptyStars}
          </div>

          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}$</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {product.price}$
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
  );
}
