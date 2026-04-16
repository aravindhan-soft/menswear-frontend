import { useLocation } from "react-router-dom";
import Navbar from "./navbar.jsx";
import Home3 from "./home3.jsx";

function Buy() {
  const location = useLocation();

  const routerProduct = location.state?.product;
  const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  const product = routerProduct || storedProduct;

  if (!product) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center" }}>No Product Selected</h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Home3
        pv_id={product.pv_id}
        sku_id={product.sku_id}
        image={product.image}
        type={product.type}
        bio={product.bio}
        sizes={product.sizes}
        selectedSize={product.selectedSize}
        shopId={product.shopId} 
      />
    </>
  );
}

export default Buy;