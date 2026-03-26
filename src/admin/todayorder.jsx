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
    <div className="admin-stock-container">
      <Adminhomepage />

      <h2 className="admin-title">TODAY'S ORDERS</h2>

      {orders.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "50px", 
          background: "#ffffff", 
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          color: "#94a3b8"
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "10px" }}>📦</div>
          <h3>No Orders Received Today</h3>
          <p>Check back later or view past orders.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "20px" }}>
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
      )}
    </div>
  );
}


export default Todayorder;