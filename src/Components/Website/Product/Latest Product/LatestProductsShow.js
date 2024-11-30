import { Axios } from "../../../../Api/axios";
import React, { useEffect, useState } from "react";
import { LATEST } from "../../../../Api/Api";
import SkeletonComp from "../../Skeleton/SkeletonComp";
import SaleProduct from "../SaleProduct/SaleProduct";

export default function LatestProductsShow() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${LATEST}`)
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
              height="350px"
              baseColor="#eee"
              style="col-md-5 col-12 mx-2"
            />
          ) : (
            productShow
          )}
        </div>
      </div>
    </div>
  );
}
