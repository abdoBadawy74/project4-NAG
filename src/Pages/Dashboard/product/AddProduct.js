import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [form, setForm] = useState({
    category: "select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };

  const nav = useNavigate();

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);

  // ref
  const focus = useRef();
  const openImage = useRef();
  const progess = useRef([]);
  const ids = useRef([]);

  // handle focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

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

  //   function handleEdit(e)
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`${PRODUCT}/edit/${id}`, form);
      console.log(res);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // handle submit form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      console.log(res);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // handle change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      handleSubmitForm();
    }
  }

  // console.log(form);
  //   console.log(title);
  // console.log(images);

  const count = useRef(-1);

  // handle images change
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFiles = e.target.files; // as setimages will rerender the component so we need to store the images in a variable
    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      count.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post(`/product-img/add`, data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded / total) * 100);
            if (percent % 10 === 0) {
              progess.current[count.current].style.width = `${percent}%`;
              progess.current[count.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        console.log(res);
        ids.current[count.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  // handle delete image
  async function handleDeleteImage(i, image) {
    const id = ids.current[i];
    try {
      const res = await Axios.delete(`/product-img/${id}`);
      console.log(res);
      setImages((prev) => prev.filter((img) => img !== image));
      ids.current = ids.current.filter((i) => i !== id);
      count.current--; // decrement the count as we are deleting the image
    } catch (err) {
      console.log(err);
    }
  }

  // maping
  const categoriesShow = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.title}
    </option>
  ));

  const imagesShow = images.map((image, i) => (
    <div key={i} className="border w-100 p-2">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2  rounded">
          <img src={URL.createObjectURL(image)} alt={image.name} width="50" />
          <div>
            <p className="mb-1">{image.name}</p>
            <p className="mb-1 text-secondary">
              {image.size / 1024 < 900 ? (
                <> {(image.size / 1024).toFixed(2)} KB</>
              ) : (
                <> {(image.size / 1024 / 1024).toFixed(2)} MB</>
              )}
            </p>
          </div>
        </div>
        <Button variant="danger" onClick={() => handleDeleteImage(i, image)}>
          {" "}
          Delete{" "}
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progess.current[i] = e)}
          className="inner-progress "
          // style={{ width: "0%" }}
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handleEdit}>
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
            {categoriesShow}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
          <Form.Label>stock</Form.Label>
          <Form.Control
            type="number"
            placeholder="stock..."
            value={form.stock}
            name="stock"
            onChange={handleChange}
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
          <Form.Label>images</Form.Label>
          <Form.Control
            type="file"
            ref={openImage}
            hidden
            multiple
            onChange={handleImagesChange}
            disabled={!sent}
          />
        </Form.Group>

        <div
          className="d-flex align-items-center justify-content-between gap-2 py-3 mb-2 w-100 flex-column"
          onClick={handleOpenImage}
          style={{
            border: !sent ? "2px dashed #777" : "2px dashed #0086fe",
            borderRadius: "5px",
            padding: "10px",
            cursor: sent && "pointer",
          }}
        >
          <img
            src={require("../../../images/upload.png")}
            alt="upload"
            width={"100px"}
            style={{ filter: !sent ? "grayscale(100%)" : "grayscale(0%)" }}
          />
          <p className="text-secondary mb-0">Upload Images</p>
        </div>

        <div className="d-flex align-items-center flex-column gap-2">
          {imagesShow}
        </div>

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
