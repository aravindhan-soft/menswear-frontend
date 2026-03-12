import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home5({ item, onDelete }) {
  const navigate = useNavigate();

  const handleBuy = () => {
    if (!item.selectedSize) {
      alert("Please select size before buying");
      return;
    }

    navigate("/buy", {
      state: {
        product: {                // ✅ wrap inside product
          pv_id: item.pv_id,
          image: item.image,
          type: item.type,
          bio: item.bio,          // ✅ ADD BIO
          sizes: item.sizes,
          selectedSize: item.selectedSize,
          rate: item.rate,
          qty: item.qty,
        },
      },
    });
  };

  return (
    <div className="lcards">
      <img
        className="cartpageimg"
        src={item.image}
        alt="preview"
      />

      {/* ❌ TYPE REMOVED */}

      {/* ✅ BIO ADDED */}
      <p className="cartpagetype">{item.bio}</p>

      <p className="cartpagerate">₹{item.rate}</p>

      <p className="cartpagesize">
        Size: <strong>{item.selectedSize}</strong>
      </p>

      <button
        className="cartpagebutton"
        onClick={handleBuy}
      >
        BUY NOW
      </button>

      <FaTrash
        className="trash"
        onClick={onDelete}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Home5;