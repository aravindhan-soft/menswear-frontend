import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";
import axios from "axios";

function ShopSelect() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async () => {
    try {
      const res = await axios.get("https://menswear-backend-production.up.railway.app/api/shops");
      setShops(res.data);
    } catch (error) {
      console.error("Error loading shops:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="collection-page">
        <div className="collection-header">
          <span className="collection-subtitle">WELCOME</span>
          <h1>Select A Shop</h1>
          <p>Please choose which of our partner shops you would like to browse products from.</p>
        </div>

        <div className="collection-grid">
          {shops.map((shop) => (
            <div
              key={shop.si_id}
              className="card"
              onClick={() => {
                localStorage.setItem("selectedShopId", shop.si_id);
                navigate(`/shop/${shop.si_id}/collections`);
              }}
            >
              <img
                src={`https://menswear-backend-production.up.railway.app/upload/${shop.shop_logo}`}  // temporary image
                alt={shop.shopname}
              />

              <p>{shop.shopname}</p>


            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ShopSelect;