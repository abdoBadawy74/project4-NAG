import React, { useEffect, useState } from "react";
import { USERS, USER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { Link } from "react-router-dom";
import TableComponent from "../../../Components/Dashboard/TableComponent";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // get current user
  useEffect(() => {
    Axios.get(`${USER}`)
      .then((res) => {
        console.log(res.data);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // get all users
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const header = [
    {
      name: "Name",
      key: "name",
    },
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Role",
      key: "role",
    },
    {
      name: "Created",
      key: "created_at",
    },
    {
      name: "Updated",
      key: "updated_at",
    },
  ];

  // handle delete user function
  async function handleDelete(id) {
    console.log(id);
    if (currentUser.id === id) {
      alert("You can't delete yourself");
      return;
    }
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(limit);

  return (
    <div className="bg-white w-100 p-2">
      <div className="d-flex align-items-center justify-content-between my-3">
        <h2 className="text-center">Users</h2>
        <Link to="/dashboard/users/add" className="btn btn-primary">
          Add User
        </Link>
      </div>

      <TableComponent
        header={header}
        data={users}
        currentUser={currentUser}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        loading={loading}
        total={total}
        searchItem="name"
        searchLink={USER}
      />
    </div>
  );
}
