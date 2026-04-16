import React, { useEffect, useState } from "react";
import Home6 from "../home6";
import Adminhomepage from "./adminhomepage";

function Todayorder() {
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("ALL");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "ADMIN") {
      fetch("http://localhost:5000/api/shops")
        .then(res => res.json())
        .then(data => setShops(data))
        .catch(err => console.error(err));
    }
  }, [role]);

useEffect(() => {
  const shopId = localStorage.getItem("shopId");

  let url = "";

  if (role === "ADMIN") {
    if (selectedShopId === "ALL") {
      url = "http://localhost:5000/api/order/today-all";
    } else {
      url = `http://localhost:5000/api/order/today/${selectedShopId}`;
    }
  } else {
    url = `http://localhost:5000/api/order/today/${shopId}`; // 🔥 SHOP DATA
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.success) setOrders(data.orders);
    });
}, [selectedShopId, role]);

  return (
    <div className="admin-stock-container">
      <Adminhomepage />

      <div style={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: '30px', marginTop: '10px' }}>
        <h2 className="admin-title" style={{ margin: 0 }}>TODAY'S ORDERS</h2>
        {role === "ADMIN" && (
          <div style={{ position: 'absolute', right: 0 }}>
            <select 
              value={selectedShopId} 
              onChange={(e) => setSelectedShopId(e.target.value)}
              className="v10-select"
            >
              <option value="ALL">All Shops</option>
              {shops.map(shop => (
                <option key={shop.si_id} value={shop.si_id}>{shop.shopname}</option>
              ))}
            </select>
          </div>
        )}
      </div>

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