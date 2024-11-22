import React, { useEffect, useState } from "react";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableComponent from "../../../Components/Dashboard/TableComponent";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // get all users
  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const header = [
    {
      key: "images",
      name: "Images",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "Description",
    },
    {
      name: "Price",
      key: "price",
    },
    {
      name: "Rating",
      key: "rating",
    },
  ];

  // handle delete user function
  async function handleDelete(id) {
    console.log(id);

    try {
      const res = await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((category) => category.id !== id));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between my-3">
        <h2 className="text-center">Products Page</h2>
        <Link to="/dashboard/category/add" className="btn btn-primary">
          Add Product
        </Link>
      </div>

      <TableComponent
        limit={limit}
        page={page}
        header={header}
        data={products}
        delete={handleDelete}
      />
    </div>
  );
}
