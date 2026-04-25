import React, { useEffect, useState } from "react";
import Navbar from "./navbar.jsx";
import Footer from "./Footer.jsx";
import { FiPackage, FiCalendar, FiCreditCard, FiClock } from "react-icons/fi";

function CustomerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userPhone = localStorage.getItem("userPhone"); // Assuming phone is stored on checkout/login

  useEffect(() => {
    if (userPhone) {
      fetch(`http://localhost:5000/api/order/customer/${userPhone}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrders(data.orders);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userPhone]);

  return (
    <>
      <Navbar />
      <div className="orders-page" style={{ background: "#f8fafc", minHeight: "90vh", padding: "40px 5%" }}>
        <div className="orders-container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <header style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "10px" }}>Your Orders</h1>
            <p style={{ color: "#64748b", fontSize: "1.1rem" }}>Track and manage your recent purchases</p>
          </header>

          {!userPhone ? (
            <div style={{ textAlign: "center", padding: "100px 20px", background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>👤</div>
              <h2>Please place an order first</h2>
              <p style={{ color: "#64748b" }}>Your order history will appear here once you make a purchase.</p>
            </div>
          ) : loading ? (
            <div style={{ textAlign: "center", padding: "50px" }}>Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 20px", background: "white", borderRadius: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "20px" }}>📦</div>
              <h2>No orders found</h2>
              <p style={{ color: "#64748b" }}>You haven't placed any orders yet. Start shopping to see them here!</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "25px" }}>
              {orders.map((order) => (
                <div 
                  key={order.or_id} 
                  className="order-card"
                  style={{ 
                    background: "white", 
                    borderRadius: "20px", 
                    padding: "25px", 
                    boxShadow: "0 4px 20px rgba(0,0,0,0.03)", 
                    display: "flex", 
                    gap: "25px",
                    border: "1px solid #f1f5f9",
                    transition: "transform 0.3s ease"
                  }}
                >
                  <div style={{ width: "120px", height: "150px", background: "#f8fafc", borderRadius: "12px", overflow: "hidden" }}>
                    <img 
                      src={order.image} 
                      alt={order.product_type} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" }}>
                      <div>
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1a7431", background: "#f0fdf4", padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase", letterSpacing: "1px" }}>
                          Order #{order.or_id}
                        </span>
                        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#0f172a", marginTop: "10px" }}>{order.category}</h3>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1a7431" }}>₹{order.perprize}</div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Qty: 1</div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px", borderTop: "1px solid #f1f5f9", paddingTop: "15px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "0.9rem" }}>
                        <FiCalendar />
                        <span>{new Date(order.ordertime).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "0.9rem" }}>
                        <FiPackage />
                        <span>Size: {order.size}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "0.9rem" }}>
                        <FiCreditCard />
                        <span style={{ textTransform: "uppercase" }}>{order.paymentType}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#1a7431", fontSize: "0.9rem", fontWeight: 700 }}>
                        <FiClock />
                        <span>Processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CustomerOrders;
