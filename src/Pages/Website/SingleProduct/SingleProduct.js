import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { PRODUCT } from "../../../Api/Api";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const images = product[0]?.images.map((image) => ({
    original: image.image,
    thumbnail: image.image,
  }));

  console.log(product[0]?.images);

  return (
    <Container className="mt-5">
      <div className="d-flex align-ite justify-content-between flex-wrap">
        <div className="col-lg-4 col-md-6 col-12">
          <ImageGallery items={images} />
        </div>
      </div>
    </Container>
  );
}
