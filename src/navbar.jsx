import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { useNavigate, useLocation } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const [search, setSearch] = useState(
    location.state?.searchText || ""
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getAvailableStock")
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      });
  }, []);

  // 🔍 FIXED FILTER LOGIC
  const filterProducts = (value) => {
    const text = value.toLowerCase();

    return products.filter(item =>
      // ✅ PRODUCT NAME (shirt / pant / tshirt / inner)
      (item.product || "").toLowerCase().includes(text) ||

      // ✅ CATEGORY (shirt / pant)
      (item.category || "").toLowerCase().includes(text) ||

      // ✅ VARIETY
      (item.variety || "").toLowerCase().includes(text) ||

      // ✅ COLOR
      (item.color || "").toLowerCase().includes(text) ||

      // ✅ SIZE
      item.sizes?.some(s =>
        (s.size || "").toLowerCase().includes(text)
      )
    );
  };

  const handleSearchClick = () => {
    if (!search.trim()) return;

    const filtered = filterProducts(search);

    navigate("/search", {
      state: {
        results: filtered,
        searchText: search,
      },
    });
  };

  return (
    <div className="navbar">
      <div className="navlogo">KUDANTHAI MENS WEAR</div>

      <div className="navmenu">

        {/* 🔍 SEARCH BAR */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <GoSearch
            className="search-icon"
            onClick={handleSearchClick}
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* 👤 PROFILE */}
        <div className="icons" >
          <IoPersonOutline />
        </div>

        {/* 🛒 CART */}
        <div
          className="icons"
          onClick={() => navigate("/cartpage")}
          style={{ position: "relative" }}
        >
          <FiShoppingCart />

        </div>

        {/* ❤️ WISHLIST */}
        <div
          className="icons"
          onClick={() => navigate("/likepage")}
          style={{ position: "relative" }}
        >
          {wishlist.length > 0 ? <FaHeart color="red" /> : <FaRegHeart />}

        </div>

      </div>
    </div>
  );
}

export default Navbar;
