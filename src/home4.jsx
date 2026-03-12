import { FaTrash } from "react-icons/fa";
import { useState } from "react";

function Home4({ item, onDelete, onMoveToCart }) {
  const [selectedSize, setSelectedSize] = useState(
    item.selectedSize || ""
  );

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    item.selectedSize = size;
  };

  return (
    <div className="lcards">
      <img
        className="likepageimg"
        src={item.image}
        alt="preview"
      />

      {/* ❌ TYPE REMOVED */}

      {/* ✅ BIO ADDED */}
      <p className="likepagetype">{item.bio}</p>

      <p className="likepagerate">₹{item.rate}</p>

      <p className="cartpagesize">
        Size: <strong>{item.selectedSize}</strong>
      </p>

      <button
        className="likepagebutton"
        onClick={onMoveToCart}
      >
        MOVE TO CART
      </button>

      <FaTrash
        className="trash"
        onClick={onDelete}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Home4;