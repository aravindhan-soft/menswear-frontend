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
      (item.product || "").toLowerCase().includes(text) ||
      (item.category || "").toLowerCase().includes(text) ||
      (item.variety || "").toLowerCase().includes(text) ||
      (item.color || "").toLowerCase().includes(text) ||
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
    <div className="navbar zen-nav">
      <div className="nav-container-zen">
        {/* 🏢 BRAND IDENTITY (ELITE) */}
        <div className="navlogo-zen" onClick={() => navigate("/")}>
          KUDANTHAI <span className="logo-sub">MENS WEAR</span>
        </div>



        {/* 🛠️ UTILITIES & ACTIONS */}
        <div className="zen-utility">
          <div className="zen-search">
            <input
              type="text"
              placeholder="Searching..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
            />
            <GoSearch className="zen-search-icon" onClick={handleSearchClick} />
          </div>

          <div className="zen-actions">
            <div className="zen-icon" title="Account">
              <IoPersonOutline />
            </div>

            <div
              className="zen-icon"
              onClick={() => navigate("/likepage")}
              title="Wishlist"
            >
              <div className="icon-wrapper">
                {wishlist.length > 0 ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
                {wishlist.length > 0 && <span className="zen-badge">{wishlist.length}</span>}
              </div>
            </div>

            <div
              className="zen-icon"
              onClick={() => navigate("/cartpage")}
              title="Cart"
            >
              <div className="icon-wrapper">
                <FiShoppingCart />
                {cart?.length > 0 && <span className="zen-badge green">{cart.length}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
