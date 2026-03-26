import { useEffect, useState } from "react";
import Home2 from "./home2.jsx";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";

function PlainCollection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/getproducts?category=Plain")
      .then((res) => res.json())
      .then((res) => {
  if (res.success) {
    setProducts(res.data);
  }
});
  }, []);

  return (
    <>
      <Navbar />

      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">ELITE COLLECTION</span>
          <h1>Plain Premium Shirts</h1>
          <p>The essence of minimalist sophistication. Our plain shirts are crafted from the finest fabrics for a flawless look and feel.</p>
        </div>

        <div className="collection-grid">
          {products.map((product) => (
            <Home2
              key={product.pv_id}
              pv_id={product.pv_id}
              sku_id={product.sku_id}
              type={product.product}
              image={product.image}
              bio={product.bio}
              sizes={product.sizes}
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

export default PlainCollection;
