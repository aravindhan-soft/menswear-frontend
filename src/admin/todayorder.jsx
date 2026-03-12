import React, { useEffect, useState } from "react";
import Home6 from "../home6";
import Adminhomepage from "./adminhomepage";

function Todayorder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/order/today") // ✅ CORRECT NOW
      .then(res => res.json())
      .then(data => {
        console.log("API:", data);
        if (data.success) {
          setOrders(data.orders);
        }
      })
      .catch(err => console.log("Error:", err));
  }, []);

  return (
    <div>
      <Adminhomepage />

      {orders.length === 0 && (
        <h2 style={{ textAlign: "center" }}>No Orders Today</h2>
      )}

      {orders.map(order => (
        <Home6
          key={order.or_id}
          image={order.image}
          orderid={order.or_id}
          size={order.size}
          rate={order.perprize}
          name={`${order.firstname} ${order.lastname}`}
          address={`${order.streetname}, ${order.city}, ${order.state} - ${order.pincode}`}
          phonenum={order.phonenumber}
          orderdate={order.ordertime}
        />
      ))}
    </div>
  );
}

export default Todayorder;