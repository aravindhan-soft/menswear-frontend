import React, { useState } from "react";

function Size() {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="sizes" style={{ marginTop: "20px" }}>
      <h3 className="titles">Size</h3>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            style={{
              padding: "10px 18px",
              border: "2px solid black",
              borderRadius: "6px",
              cursor: "pointer",
              backgroundColor: selectedSize === size ? "green" : "white",
              color: selectedSize === size ? "white" : "black",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Size;
