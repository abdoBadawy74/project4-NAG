import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import TitleSlice from "../../../../Helpers/TitleSlice";
import { NavLink } from "react-router-dom";

export default function TopRated(props) {
  const { product } = props;
  const stars = Math.min(Math.round(product.rating), 5);
  const goldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} className="text-warning" />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regular} />
  ));
  return (
    <NavLink
      to={`/product/${product.id}`}
      className="d-flex flex-wrap justify-content-center gap-3 gap-md-0 border-bottom p-3"
    >
      <img
        src={product.images[0].image}
        alt="product"
        width={"180px"}
        className="rounded img-fluid"
      />
      <div className="px-5 py4 flex-grow-1 d-flex flex-column justify-content-between">
        <div>
          <p className="m-0" style={{ color: "gray" }}>
            {TitleSlice(product.title, 0, 15)}
          </p>
          <p className="text-black">{TitleSlice(product.description, 0, 30)}</p>
        </div>

        <div className="d-flex align-items-center justify-content-between  mt-2">
          <div>
            {goldStars}
            {emptyStars}

            <div className="d-flex align-items-center  gap-3">
              <h5 className="m-0 text-primary">{product.discount}$</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {product.price}$
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../images/cart.png")}
              alt="heart"
              width={"30px"}
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
