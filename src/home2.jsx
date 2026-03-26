import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

function Home2({ image, type, sizes, pv_id, sku_id, bio }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentRate, setCurrentRate] = useState(null);

  const navigate = useNavigate();
  const { wishlist, toggleLike } = useWishlist();
  const { addToCart } = useCart();

  const isLiked = wishlist.some((item) => item.image === image);

  // 🔥 STANDARD SIZES
  const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];
  const safeSizes = Array.isArray(sizes) ? sizes : [];

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    if (!selectedSize || !currentRate) {
      alert("Please select size");
      return;
    }

    addToCart({
      image,
      type,
      bio,
      sizes: safeSizes,
      selectedSize,
      rate: currentRate,
      qty: 1,
    });

    navigate("/cartpage");
  };

  // 🛍 BUY NOW
  const handleBuy = () => {
    if (!selectedSize || !currentRate) {
      alert("Please select size");
      return;
    }

    const productData = {
      pv_id,
      sku_id,
      image,
      type,
      bio,
      sizes: safeSizes,
      selectedSize,
      rate: currentRate,
    };

    localStorage.setItem("selectedProduct", JSON.stringify(productData));
    navigate("/buy", { state: { product: productData } });
  };

  // ❤️ LIKE BUTTON
  const handleLike = () => {
    if (!selectedSize || !currentRate) {
      alert("Please select size");
      return;
    }

    toggleLike({
      image,
      type,
      bio,
      sizes: safeSizes,
      selectedSize,
      rate: currentRate,
    });
  };

  return (
    <div className="cards">
      <div className="card-image-wrapper">
        <img src={image} alt={type} />
        <button className="like-btn-mini" onClick={handleLike}>
          {isLiked ? <FaHeart color="#ef4444" /> : <FaRegHeart />}
        </button>
      </div>

      <div className="card-content-v2">
        <p className="card-bio-v2">
          {bio ? bio : "Premium Mens Wear"}
        </p>
        
        <h3 className="card-rate-v2">
          {currentRate ? `₹${currentRate}` : "---"}
        </h3>
      </div>

      <div className="card-sizes-v2">
        {ALL_SIZES.map((sz) => {
          const found = safeSizes.find((s) => s.size === sz);
          const outOfStock = !found || found.quantity === 0;

          return (
            <button
              key={sz}
              disabled={outOfStock}
              className={`size-chip-v2 ${selectedSize === sz ? "active" : ""} ${outOfStock ? "out-of-stock" : ""}`}
              onClick={() => {
                setSelectedSize(sz);
                setCurrentRate(found.prize);
              }}
            >
              {sz}
            </button>
          );
        })}
      </div>

      <div className="card-actions-v2">
        <button className="purchases" onClick={handleBuy}>
          BUY NOW
        </button>
        <button className="cart" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default Home2;
