import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Category() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const {id} = useParams()
  console.log(id);

  //   get user data

  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATEGORY}/${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setImage(res.data.image);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        nav("/dashboard/categries/page/404", { replace: true });
      })
      .finally(() => {
        setDisabled(false);
      });
  }, []);

  //   function handleSubmit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    console.log(form);

    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`, form);
      console.log(res);
      window.location.replace("/dashboard/categories");
    } catch (err) {
      console.log(err);
    }
  }

  //   console.log(name);
  //   console.log(email);

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <h2 className="my-3">Update Category</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(() => e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>image</Form.Label>
          <Form.Control
            type="file"
            // value={image}
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>

        <button className="btn btn-primary" disabled={disabled}>
          Save Edits
        </button>
      </Form>
    </>
  );
}
