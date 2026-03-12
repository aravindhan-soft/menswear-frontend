import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";

function Home2({ image, type, sizes , pv_id, sku_id, bio}) {
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
    rate: currentRate,   // ✅ VERY IMPORTANT
  };

  // ✅ Save for refresh support
  localStorage.setItem("selectedProduct", JSON.stringify(productData));

  navigate("/buy", { state: { product: productData } });
};
  // ❤️ LIKE BUTTON (🔥 NEW LOGIC)
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
    <div
      className="cards"
      style={{ position: "relative", width: "300px", height: "400px" }}
    >
      <div style={{ position: "relative" }}>
        <img src={image} alt="shirt" />

        {/* ❤️ LIKE */}
        <button
          onClick={handleLike}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            border: "none",
            background: "transparent",
          }}
        >
          {isLiked ? (
            <FaHeart size={26} color="red" />
          ) : (
            <FaRegHeart size={26} />
          )}
        </button>
      </div>


<p style={{ fontSize: "20px",marginTop: "10px", color: "black" ,fontWeight: "bold"  }}>
  {bio ? bio : "No description available"}
</p>

      {/* SIZE SELECT */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {ALL_SIZES.map((sz) => {
          const found = safeSizes.find((s) => s.size === sz);
          const outOfStock = !found || found.quantity === 0;

          return (
            <button
              key={sz}
              disabled={outOfStock}
              onClick={() => {
                setSelectedSize(sz);
                setCurrentRate(found.prize);
              }}
              style={{
                padding: "8px 15px",
                border: "1px solid black",
                borderRadius: "5px",
                backgroundColor:
                  selectedSize === sz ? "green" : "white",
                color:
                  selectedSize === sz ? "white" : "black",
                opacity: outOfStock ? 0.3 : 1,
                cursor: outOfStock ? "not-allowed" : "pointer",
              }}
            >
              {sz}
            </button>
          );
        })}
      </div>

      <h3 style={{ marginTop: "10px" }}>
        {currentRate ? `₹${currentRate}` : "Select Size"}
      </h3>

      {/* BUY */}
      <button className="purchases" onClick={handleBuy}>
        BUY
      </button>

      {/* ADD TO CART */}
      <button className="cart" onClick={handleAddToCart}>
        ADD TO CART
      </button>
    </div>
  );
}

export default Home2;
