import "./Home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import LatestSaleProduct from "../../../Components/Website/Product/LatestSaleProduct";
import About from "../../../Components/Website/about/About";
import TopRatedShow from "../../../Components/Website/Product/TopRatedShow";
export default function Homepage() {
  return (
    <>
      <Landing />
      <LatestSaleProduct />
      <About />
      <TopRatedShow />
    </>
  );
}
