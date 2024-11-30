import { Axios } from "../../../Api/axios";
import React, { useEffect, useState } from "react";
import { LATEST_SALE_PRODUCTS } from "../../../Api/Api";
import Product from "./Product";
import { Container } from "react-bootstrap";
import SkeletonComp from "../SkeletonComp";
import TopRated from "./TopRated";

export default function TopRatedShow() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATEST_SALE_PRODUCTS}`)
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  console.log(products);
  const productShow = products.map((product) => (
    <TopRated key={product.id} product={product} />
  ));
  return (
    <Container className="mt-5">
      <div className="w-50 border border-primary mb-4 rounded">
        <h1 className="text-center mb-2 py-2 text-white bg-primary fw-bold">Top Rated</h1>
        <div className="d-flex flex-column justify-content-center flex-wrap my-5 row-gap-3 ">
          {loading ? (
            <SkeletonComp
              count={"8"}
              height="250px"
              baseColor="#eee"
              style="col-lg-2 col-md-4 col-8 mx-2"
            />
          ) : (
            productShow
          )}
        </div>
      </div>
    </Container>
  );
}
