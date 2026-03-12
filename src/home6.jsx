import React from "react";

function Home6({
  image,
  orderid,
  size,
  rate,
  name,
  address,
  phonenum,
  orderdate
}) {

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="tcard">

      <img
        className="home6img"
        src={image || "https://via.placeholder.com/150"}
        alt="preview"
      />

      <p className="home6orderid">
        <strong>Order ID:</strong> {orderid}
      </p>

      <p className="home6size">
        <strong>Size:</strong> {size}
      </p>

      <p className="home6rate">
        <strong>Rate:</strong> ₹{rate}
      </p>

      <p className="home6name">
        <strong>Name:</strong> {name}
      </p>

      <p className="home6address">
        <strong>Address:</strong> {address}
      </p>

      <p className="home6phonenum">
        <strong>Phone:</strong> {phonenum}
      </p>

      <p className="home6orderdate">
        <strong>Order Date:</strong> {formatDate(orderdate)}
      </p>


    </div>
  );
}

export default Home6;