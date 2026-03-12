import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

function Home3({
  pv_id,
  sku_id,
  image,
  type,
  bio,
  sizes = [],
  selectedSize: initialSize,
}) {
  const ALL_SIZES = ["S", "M", "L", "XL", "XXL"];
  const dbSizes = Array.isArray(sizes) ? sizes : [];

  const [selectedSize, setSelectedSize] = useState(initialSize || null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleLike } = useWishlist();

  // 🔥 PRICE FINDER
  const getPrice = (size) => {
    const found = dbSizes.find((s) => s.size === size);
    return found ? found.prize : 0;
  };

  // 🛒 ADD TO CART
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    addToCart({
      pv_id,
      image,
      type,
      bio,
      sizes: dbSizes,          // 🔥 FULL SIZE DATA
      selectedSize,            // 🔥 IMPORTANT
      rate: getPrice(selectedSize),
      qty: 1,
    });

    navigate("/cartpage");
  };

  // ❤️ ADD TO WISHLIST
  const handleWishlist = () => {
    if (!selectedSize) {
      alert("Please select size");
      return;
    }

    toggleLike({
      pv_id,
      image,
      type,
      bio,
      sizes: dbSizes,          // 🔥 FULL SIZE DATA
      selectedSize,            // 🔥 IMPORTANT
      rate: getPrice(selectedSize),
      qty: 1,
    });

    navigate("/likepage");
  };

  // 🔥 BUY NOW
const handleBuy = () => {
  if (!selectedSize) {
    alert("Please select size");
    return;
  }

  const productData = {
    pv_id,
    sku_id,
    image,
    type,
    bio,
    sizes: dbSizes,
    selectedSize,
    rate: getPrice(selectedSize),
  };

  localStorage.setItem("selectedProduct", JSON.stringify(productData));

  navigate("/pay", {
    state: { product: productData },
  });
};



  return (
    
    < >
      {/* IMAGE */}
      <div
        className="bcards"
        style={{ position: "relative", width: "500px" }}
      >
        <img
          src={image}
          alt="preview"
          style={{
            width: "100%",
            borderRadius: "50px",
            border: "1px solid black",
          }}
        />
      </div>

      {/* TYPE */}
      <div className="type">
        <h1 >
  {bio ? bio : "No description available"}
</h1>
      </div>

      {/* SIZES */}
      <div className="buysizes">
        <h2>SIZES:</h2>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {ALL_SIZES.map((sz) => {
            const found = dbSizes.find((s) => s.size === sz);
            const outOfStock = !found || found.quantity === 0;

            return (
              <button
                key={sz}
                disabled={outOfStock}
                onClick={() => setSelectedSize(sz)}
                style={{
                  padding: "20px 25px",
                  border: "1px solid black",
                  borderRadius: "5px",
                  backgroundColor:
                    selectedSize === sz ? "green" : "white",
                  color:
                    selectedSize === sz ? "white" : "black",
                  fontSize: "large",
                  opacity: outOfStock ? 0.3 : 1,
                  cursor: outOfStock ? "not-allowed" : "pointer",
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>

        {/* PRICE */}
        <h2 style={{ marginTop: "15px" }}>
          ₹ {selectedSize ? getPrice(selectedSize) : 0}
        </h2>

        {/* BUY */}
        <button className="container" onClick={handleBuy}>
          BUY
        </button>

        <br /><br />

        {/* ADD TO CART */}
        <button className="container" onClick={handleAddToCart}>
          ADD TO CART
        </button>
        <FiShoppingCart className="bicon" />

        <br /><br />

        {/* WISHLIST */}
        <button className="container" onClick={handleWishlist}>
          ADD TO WISHLIST
        </button>
        <FaRegHeart className="bicon" />
      </div>
    </>

  );
}

export default Home3;
