import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ type, image, path, shopId }) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="card"
        onClick={() => navigate(`/shop/${shopId}${path}`)}
      >
        <img src={image} alt={type} />
        <p>{type}</p>
      </div>
    </>
  );
}

export default Home;