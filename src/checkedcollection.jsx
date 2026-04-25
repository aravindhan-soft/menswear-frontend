import { useEffect, useState } from "react";
import Home2 from "./home2.jsx";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";
import { useParams } from "react-router-dom";

function Checkedcollection() {
  const [products, setProducts] = useState([]);
  const { shopId } = useParams();

  useEffect(() => {
    fetch(`http://menswear-backend-production.up.railway.app/api/getproducts?category=Checked&shopId=${shopId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching checked products:", err));
  }, [shopId]);

  return (
    <>
      <Navbar />
      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">ELITE COLLECTION</span>
          <h1>Checked Premium Shirts</h1>
          <p>Classic checked patterns crafted with precision for a bold, sophisticated look.</p>
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
              shopId={shopId}  
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkedcollection;
