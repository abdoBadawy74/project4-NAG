import { Axios } from "../../../Api/axios";
import React, { useEffect, useState } from "react";
import { LATEST_SALE_PRODUCTS } from "../../../Api/Api";
import Product from "./Product";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATEST_SALE_PRODUCTS}`).then((res) => {
      setProducts(res.data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  console.log(products);
  const productShow = products.map((product) => (
    <Product key={product.id} product={product} />
  ));
  return (
    <Container>
      <h1 className="my-5 fw-bold">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap my-5 row-gap-3 ">
        {loading ? (
          <>
            <div className="col-lg-3 col-md-6 col-12">
              <Skeleton height={300} width="250px" />
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <Skeleton height={300} width="250px" />
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <Skeleton height={300} width="250px" />
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <Skeleton height={300} width="250px" />
            </div>
          </>
        ) : (
          productShow
        )}
      </div>
    </Container>
  );
}
