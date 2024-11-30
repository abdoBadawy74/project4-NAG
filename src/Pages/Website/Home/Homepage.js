import "./Home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import LatestSaleProduct from "../../../Components/Website/Product/SaleProduct/LatestSaleProduct";
import About from "../../../Components/Website/about/About";
import TopRatedShow from "../../../Components/Website/Product/TopRated/TopRatedShow";
import LatestProductsShow from "../../../Components/Website/Product/Latest Product/LatestProductsShow";
export default function Homepage() {
  return (
    <>
      <Landing />
      <LatestSaleProduct />
      <About />
      <div className="d-flex mt-5 mx-4 flex-wrap align-items-start ">
        <TopRatedShow />
        <LatestProductsShow />
      </div>
    </>
  );
}
