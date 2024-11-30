import { useEffect, useState } from "react";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import "./Categories.css";
import TitleSlice from "../../../Helpers/TitleSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonComp from "../Skeleton/SkeletonComp";

export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categoriesShow = categories.map((category) => (
    <div
      key={category.id}
      className="col-lg-2 col-md-6 col-12 bg-transparent border-0"
    >
      <div className="m-1 bg-white d-flex align-items-center justify-content-start rounded gap-4 py-2 h-100 px-2">
        <img
          src={category.image}
          alt={category.title.slice(0, 3)}
          width={50}
          className="img-fluid"
        />
        <p key={category.id} className="m-0">
          {TitleSlice(category.title, 0, 15)}
        </p>
      </div>
    </div>
  ));

  return (
    <>
      <div className="cats py-5">
        <Container>
          <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
            {loading ? (
              <SkeletonComp
                count={"20"}
                height="70px"
                baseColor="white"
                style="col-lg-2 col-md-6 col-12 mx-2"
              />
            ) : (
              categoriesShow
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
