import React, { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableComponent from "../../../Components/Dashboard/TableComponent";
import { Form } from "react-bootstrap";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  // get all categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((res) => {
        console.log(res);
        setCategories(res.data.data);
        setTotal(res.data.total);
      })

      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      name: "Title",
      key: "title",
    },
    {
      name: "image",
      key: "image",
    },
  ];

  // handle delete user function
  async function handleDelete(id) {
    console.log(id);

    try {
      const res = await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between my-3">
        <h2 className="text-center">Categories Page</h2>
        <Link to="/dashboard/category/add" className="btn btn-primary">
          Add category
        </Link>
      </div>

      {/* <Form.Control
        className="my-2"
        type="search"
        aria-label="input example"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}

      <TableComponent
        limit={limit}
        setLimit={setLimit}
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        setPage={setPage}
        loading={loading}
        total={total}
        searchItem="title"
        searchLink={CATEGORY}
      />
    </div>
  );
}
