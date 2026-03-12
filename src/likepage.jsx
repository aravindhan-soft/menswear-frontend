// Likepage.jsx
import Navbar from "./navbar.jsx";
import Home4 from "./home4.jsx";
import { useWishlist } from "./context/WishlistContext";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

function Likepage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    // 🚨 SIZE CHECK
    if (!item.selectedSize) {
      alert("Please select size before moving to cart");
      return;
    }

    addToCart({
      bio: item.bio,
      image: item.image,
      type: item.type,
      rate: item.rate,
      sizes: item.sizes,             // ✅ FULL SIZES
      selectedSize: item.selectedSize, // ✅ SELECTED SIZE
      qty: 1,
    });

    removeFromWishlist(item.image);
    navigate("/cartpage");
  };

  return (
    <div>
      <Navbar />

      {wishlist.length === 0 && (
        <h2 style={{ textAlign: "center" }}>
          No liked items
        </h2>
      )}

      {wishlist.map((item, index) => (
        <Home4
          key={index}
          item={item}
          onDelete={() => removeFromWishlist(item.image)}
          onMoveToCart={() => handleMoveToCart(item)}
        />
      ))}
    </div>
  );
}

export default Likepage;
