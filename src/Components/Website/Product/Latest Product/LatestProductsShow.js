import { Axios } from "../../../../Api/axios";
import React, { useEffect, useState } from "react";
import { LATEST_SALE_PRODUCTS } from "../../../../Api/Api";
import { Container } from "react-bootstrap";
import SkeletonComp from "../../Skeleton/SkeletonComp";
import SaleProduct from "../SaleProduct/SaleProduct";

export default function LatestProductsShow() {
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
    <SaleProduct key={product.id} product={product} col="6" />
  ));
  return (
    <div className="col-md-6 col-12">
      <div className="ms-md-3">
        <h1 className="fw-bold">Latest Products</h1>
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
      </div>
    </div>
  );
}
