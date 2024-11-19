import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  //   function handleSubmit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    console.log(form);

    try {
      const res = await Axios.post(`${CATEGORY}/add`, form);
      console.log(res);
      window.location.replace("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }


    // ref
    const focus = useRef();

    // handle focus
    useEffect(() => {
      focus.current.focus();
    })


  console.log(title);
  console.log(image);

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <h2 className="my-3">Add Category</h2>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            ref={focus}
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

        <button
          className="btn btn-primary"
          disabled={title === "" ? true : false}
        >
          Save Edits
        </button>
      </Form>
    </>
  );
}
