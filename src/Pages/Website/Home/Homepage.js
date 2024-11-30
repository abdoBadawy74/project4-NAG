import "./Home.css";
import Landing from "../../../Components/Website/Landing/Landing";
import LatestSaleProduct from "../../../Components/Website/Product/LatestSaleProduct";
export default function Homepage() {
  return (
    <>
      <Landing />
      <LatestSaleProduct />
      <div
        className="w-100 p-4 d-flex justify-content-between align-items-center flex-wrap"
        style={{
          background: "#d8f4ff",
        }}
      >
        <div className="mt-5">
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Shampo Nice
          </h2>
          <p className="text-muted">Another Nice Thing Which Is Used By Many People</p>
          <button className="btn btn-primary">Shop Now</button>
        </div>
        <img src={require("../../../images/shampoo.png")} class="m-4" alt="shampoo" height={"350px"} />
      </div>
    </>
  );
}
