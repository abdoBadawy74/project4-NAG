import { Axios } from "../../../Api/axios"
import React, { useEffect, useState } from "react";
import { LATEST_SALE_PRODUCTS } from "../../../Api/Api";

export default function LatestSaleProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    Axios.get(`${LATEST_SALE_PRODUCTS}`).then((res) => {
      setProducts(res.data);
    });
  }, []);
  console.log(products);
  return <div>LatestSaleProduct</div>;
}
