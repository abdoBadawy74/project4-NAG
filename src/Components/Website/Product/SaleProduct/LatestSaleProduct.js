import { Axios } from "../../../../Api/axios";
import React, { useEffect, useState } from "react";
import { LATEST_SALE_PRODUCTS } from "../../../../Api/Api";
import SaleProduct from "./SaleProduct";
import { Container } from "react-bootstrap";
import SkeletonComp from "../../Skeleton/SkeletonComp";

export default function LatestSaleProduct() {
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
    <SaleProduct key={product.id} product={product} col="3" />
  ));
  return (
    <Container>
      <h1 className="my-5 fw-bold">Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap my-5 row-gap-3 ">
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
    </Container>
  );
}
