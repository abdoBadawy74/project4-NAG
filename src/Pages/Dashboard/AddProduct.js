import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../Api/axios";
import { CATEGORIES, CATEGORY, PRODUCT } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all users
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((res) => {
        // console.log(res);
        setCategories(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const nav = useNavigate();
  //   function handleSubmit
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("category", form.category);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("discount", form.discount);
      formData.append("About", form.About);
      for (let i = 0; i < images.length; i++) {
        formData.append("images[]", images[i]);
      }

      const res = await Axios.post(`${PRODUCT}/add`, formData);
      console.log(res);
      nav("/dashboard/products");
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
  }, []);

  // handle change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  console.log(form);
  //   console.log(title);
  console.log(images);

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleSubmit}>
        <h2 className="my-3">Add Product</h2>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Select
            type="text"
            ref={focus}
            placeholder="name..."
            value={form.category}
            name="category"
            onChange={handleChange}
          >
            <option disabled>select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="name..."
            value={form.title}
            name="title"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>description</Form.Label>
          <Form.Control
            type="text"
            placeholder="description..."
            value={form.description}
            name="description"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="text"
            placeholder="price..."
            value={form.price}
            name="price"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>discount</Form.Label>
          <Form.Control
            type="text"
            placeholder="discount..."
            value={form.discount}
            name="discount"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>about</Form.Label>
          <Form.Control
            type="text"
            placeholder="about..."
            value={form.About}
            name="About"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>images</Form.Label>
          <Form.Control
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </Form.Group>

        <button
          className="btn btn-primary"
          //   disabled={title === "" ? true : false}
        >
          Save Edits
        </button>
      </Form>
    </>
  );
}
