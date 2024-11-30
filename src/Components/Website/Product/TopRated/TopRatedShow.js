import { Axios } from "../../../../Api/axios";
import React, { useEffect, useState } from "react";
import { TOP_RATED } from "../../../../Api/Api";
import SkeletonComp from "../../Skeleton/SkeletonComp";
import TopRated from "./TopRated";

export default function TopRatedShow() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${TOP_RATED}`)
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
    <div className="col-md-6 col-12 border border-primary mb-4 rounded overflow-hidden">
      <h1 className="text-center mb-2 py-2 text-white bg-primary fw-bold">
        Top Rated
      </h1>
      <div className="d-flex flex-column justify-content-center flex-wrap my-5 row-gap-3 ">
        {loading ? (
          <SkeletonComp
            count={"8"}
            height="230px"
            width="100%"
            baseColor="#eee"
            style="mx-4"
          />
        ) : (
          productShow
        )}
      </div>
    </div>
  );
}
