import { useEffect, useState } from "react";
import Home2 from "./home2.jsx";
import Navbar from "./navbar.jsx";

function Checkedcollection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/getProducts?category=Checked")
      .then(res => res.json())
      .then(res => {
        if (res.success) setProducts(res.data);
      })
      .catch(err => console.error("Error fetching checked products:", err));
  }, []);

  return (
    <div>
      <Navbar />

      {products.map((product) => (
        <Home2
    key={product.pv_id}          // ✅ unique key
    pv_id={product.pv_id}        // ✅ send to Home2
    sku_id={product.sku_id}      // ✅ send to Home2
    type={product.product}
    image={product.image}
    bio={product.bio}  
    sizes={product.sizes}
    variety={product.variety}
    color={product.color}
        />
      ))}
    </div>
  );
}

export default Checkedcollection;
