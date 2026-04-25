import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Home2 from "./home2.jsx";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";
import { IoIosArrowBack } from "react-icons/io";

function ShopProducts() {
  const { shopId } = useParams();   // shop id from URL
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, [shopId]);

  const loadProducts = async () => {
    try {
      const res = await fetch(`https://menswear-backend-production.up.railway.app/api/shopProducts/${shopId}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="collection-page">
        <div className="collection-header">

          <button
            onClick={() => navigate("/")}
            className="back-navigator"
            style={{
              background: "none",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              marginBottom: "10px"
            }}
          >
            <IoIosArrowBack /> Switch Shop
          </button>

          <h1> Products not Available</h1>
        </div>

        <div className="collection-grid">
          {products.map((product) => (
            <Home2
              key={product.pv_id}
              pv_id={product.pv_id}
              sku_id={product.sku_id}
              type={product.product}
              image={`http://menswear-backend-production.up.railway.app/product/${product.pv_id}`}
              bio={product.bio}
              sizes={product.size}
              variety={product.variety}
              color={product.color}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShopProducts;