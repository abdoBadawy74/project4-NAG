import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CART, PRODUCT } from "../../../Api/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regular } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import SkeletonComp from "../../../Components/Website/Skeleton/SkeletonComp";
import { Cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../Components/Website/Btns/PlusMinusBtn";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { setIsChange } = useContext(Cart);
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        console.log(res.data[0]);
        setProduct(res.data[0]);
        setImages(
          res.data[0].images.map((img) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id === product.id)[0]
        ?.count;
      const res = await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      console.log(res);
      setLoadingCart(false);
      return true;
    } catch (err) {
      console.log(err);
      setLoadingCart(false);
      return false;
    } finally {
    }
  };

  const handleSave = () => {
    const state = checkStock();
    if (state) {
      const getItems = JSON.parse(localStorage.getItem("product")) || [];

      const check = getItems.findIndex((item) => item.id === product.id);
      console.log(getItems[check]);

      if (check !== -1) {
        if (getItems[check].count) {
          getItems[check].count += count;
        } else {
          getItems[check].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItems.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItems));
      setIsChange((prev) => !prev);
    }
  };

  const stars = Math.min(Math.round(product.rating), 5);
  const goldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={solid} className="text-warning" />
  ));
  const emptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regular} />
  ));

  return (
    <Container className="mt-5">
      <div className="d-flex align-ite  flex-wrap">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <SkeletonComp height="250px" count="1" style="col-12" />
              <div className="col-12 d-flex gap-1 ">
                <SkeletonComp height="90px" count="1" style="col-4" />
                <SkeletonComp height="90px" count="1" style="col-4" />
                <SkeletonComp height="90px" count="1" style="col-4" />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-4">
                <SkeletonComp height="30px" count="1" style="col-9" />
                <SkeletonComp height="30px" count="1" style="col-9" />
                <SkeletonComp height="30px" count="1" style="col-9" />
                <SkeletonComp height="30px" count="1" style="col-9" />
                <SkeletonComp height="30px" count="1" style="col-9" />
                <SkeletonComp height="30px" count="1" style="col-9" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={images} />
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className={"ms-4"}>
                <h1>{product.title}</h1>
                <p className="m-0 text-secondary ">{product.description}</p>
                <p className="fs-3">{product.About}</p>
                <div>
                  <div>
                    {goldStars}
                    {emptyStars}
                  </div>
                  <p className="text-danger my-2">
                    There is only {product.stock} left
                  </p>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">{product.discount}$</h5>
                      <h6
                        className="m-0"
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.price}$
                      </h6>
                    </div>
                    <div className="d-flex gap-2">
                      <PlusMinusBtn setCount={(data) => setCount(data)} />
                      <div onClick={handleSave} className="border p-2 rounded">
                        {loadingCart ? (
                          "loading..."
                        ) : (
                          <img
                            src={require("../../../images/cart.png")}
                            alt="heart"
                            width={"30px"}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
