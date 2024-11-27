import { Axios } from "../../../Api/axios";
import React, { useEffect, useState } from "react";
import { LATEST_SALE_PRODUCTS } from "../../../Api/Api";
import Product from "./Product";
import { Container } from "react-bootstrap";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get(`${LATEST_SALE_PRODUCTS}`).then((res) => {
      setProducts(res.data);
    });
  }, []);
  console.log(products);
  const productShow = products.map((product) => (
    <Product key={product.id} product={product} />
  ));
  return (
    <Container>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap my-5 row-gap-3 ">
        {productShow}
      </div>
    </Container>
  );
}
