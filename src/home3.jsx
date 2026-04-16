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
  shopId,
  sizes = [],
  selectedSize: initialSize,
}) {

  const finalShopId = shopId || localStorage.getItem("selectedShopId");

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
      sku_id,
      image,
      type,
      bio,
      sizes: dbSizes,          // 🔥 FULL SIZE DATA
      selectedSize,            // 🔥 IMPORTANT
      rate: getPrice(selectedSize),
      qty: 1,
      shopId: finalShopId  
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
      sku_id,
      image,
      type,
      bio,
      sizes: dbSizes,          // 🔥 FULL SIZE DATA
      selectedSize,            // 🔥 IMPORTANT
      rate: getPrice(selectedSize),
      qty: 1,
      shopId: finalShopId 
    });

    navigate("/likepage");
  };

  // 🔥 BUY NOW
 const handleBuy = () => {
  if (!selectedSize) {
    alert("Please select size");
    return;
  }

  if (!finalShopId) {
    console.error("❌ shopId missing in Home3");
    alert("Shop ID missing");
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
    shopId: finalShopId   // ✅ FIXED
  };

  localStorage.setItem("selectedProduct", JSON.stringify(productData));

  navigate("/pay", {
    state: { product: productData },
  });
};


  return (
    <>
      <div className="pdp-container-v2">
        {/* ✨ DESIGN 2: PLATINUM BOUTIQUE LAYOUT */}
        <div className="pdp-left-visual">
          <div className="pdp-image-container">
            <span className="limited-badge">EXCLUSIVE</span>
            <img src={image} alt={type} className="pdp-hero-image" />
            <button className="pdp-wishlist-pills" onClick={handleWishlist}>
              <FaRegHeart /> FAVORITE
            </button>
          </div>
        </div>

        <div className="pdp-right-info">
          <div className="info-scroll-box">
            <div className="mobile-only-handle"></div>

            <div className="pdp-brand-header">
              <span className="brand-name">KUDANTHAI PREMIUM</span>
              <div className="pdp-stock-status">IN STOCK</div>
            </div>

            <h1 className="pdp-main-title">{type}</h1>
            <p className="pdp-item-bio">{bio || "A pinnacle of craftsmanship, designed for those who command presence and appreciate the finer details of modern tailoring."}</p>

            <div className="pdp-price-row">
              <span className="price-label">LIST PRICE:</span>
              <span className="price-value">₹{selectedSize ? getPrice(selectedSize) : "---"}</span>
            </div>

            {/* SIZE ARCHITECTURE */}
            <div className="pdp-size-hub">
              <div className="size-label-row">
                <label>AVAILABLE SIZES</label>
                <button className="size-chart-link">VIEW CHART</button>
              </div>
              <div className="size-buttons-group">
                {ALL_SIZES.map((sz) => {
                  const found = dbSizes.find((s) => s.size === sz);
                  const outOfStock = !found || found.quantity === 0;

                  return (
                    <button
                      key={sz}
                      disabled={outOfStock}
                      className={`size-btn-luxury ${selectedSize === sz ? "selected" : ""} ${outOfStock ? "disabled" : ""}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CONVERSION HUB */}
            <div className="pdp-conversion-v2">
              <button className="buy-button-luxury" onClick={handleBuy}>
                PURCHASE NOW
              </button>
              <button className="cart-button-luxury" onClick={handleAddToCart}>
                <FiShoppingCart /> ADD TO BAG
              </button>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home3;
