import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Pay() {

  const location = useLocation();

const routerProduct = location.state?.product;
const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

const productData = routerProduct || storedProduct;  // ✅ FIRST

console.log("Pay page productData:", productData);
console.log("Shop ID in Pay:", productData.shopId);

if (!productData) {
  return <h2 style={{ textAlign: "center" }}>No Order Found</h2>;
}

const shopId = productData.shopId;  // ✅ AFTER

  const image = productData.image;
  const type = productData.type;
  const selectedSize = productData.selectedSize;
  const rate = productData.rate;
  const pv_id = productData.pv_id;
  const sku_id = productData.sku_id;


  const [paymentMethod, setPaymentMethod] = useState("");
  const [razorpayReady, setRazorpayReady] = useState(false);

  const [form, setForm] = useState({
    contact: "",
    firstname: "",
    lastname: "",
    country: "",
    streetname: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    saveinfo: false,
  });

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpay().then((loaded) => {
      if (!loaded) alert("Razorpay SDK failed to load");
      else setRazorpayReady(true);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async () => {

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    let u_id, or_id, finalAmount;

    // 🔹 SAVE USER + ADDRESS
    try {
      const saveRes = await fetch("http://menswear-backend-production.up.railway.app/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const saveData = await saveRes.json();

      if (!saveData.success) {
        alert(saveData.message);
        return;
      }

      u_id = saveData.u_id;
      localStorage.setItem("userPhone", form.contact);

    } catch (err) {
      alert("Failed to save user details");
      return;
    }

    // 🔹 CREATE ORDER
    try {
      const orderRes = await fetch("http://menswear-backend-production.up.railway.app/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          u_id,
          paymentMethod,
          product: {
            pv_id,
            quantity: 1,
            price: rate,
            image,
            shopId: shopId, 
            size: selectedSize   // ✅ ADD THIS
          }
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert(orderData.message);
        return;
      }

      or_id = orderData.or_id;
      finalAmount = orderData.totalAmount;

    } catch (err) {
      alert("Order creation failed");
      return;
    }

    // 🔥 CASH ON DELIVERY
    if (paymentMethod === "cod") {
      alert("Order Confirmed ✅\n₹100 Cash on Delivery charge added");
      return;
    }

    // 🔥 ONLINE PAYMENT
    if (!razorpayReady) {
      alert("Razorpay is still loading...");
      return;
    }

    try {
      const res = await fetch("http://menswear-backend-production.up.railway.app/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, or_id }),
      });

      const order = await res.json();
      if (!order.id) {
        alert("Razorpay order creation failed");
        return;
      }

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "KUDANTHAI MENS WEAR",
        description: "Order Payment",
        order_id: order.id,
        handler: function () {
          alert("Payment Successful ✅");
        },
        prefill: {
          name: form.firstname + " " + form.lastname,
          email: form.contact.includes("@") ? form.contact : "",
          contact: !form.contact.includes("@") ? form.contact : "",
        },
        theme: { color: "#1e6324" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* LEFT COLUMN: CONTACT & SHIPPING */}
        <div className="checkout-main">
          
          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">👤</span>
              <h2>CONTACT DETAILS</h2>
            </div>
            
            <div className="form-group">
              <label>EMAIL OR PHONE NUMBER</label>
              <input 
                name="contact" 
                placeholder="Enter your email or phone" 
                value={form.contact} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">📍</span>
              <h2>SHIPPING ADDRESS</h2>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>FIRST NAME</label>
                <input name="firstname" placeholder="First name" value={form.firstname} onChange={handleChange} />
              </div>
              <div className="form-group half">
                <label>LAST NAME</label>
                <input name="lastname" placeholder="Last name" value={form.lastname} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label>COUNTRY / REGION</label>
              <input name="country" placeholder="Country" value={form.country} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>STREET ADDRESS</label>
              <input name="streetname" placeholder="House number and street name" value={form.streetname} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>APARTMENT, UNIT, ETC. (OPTIONAL)</label>
              <input name="apartment" placeholder="Apartment, suite, unit, etc." value={form.apartment} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group third">
                <label>TOWN / CITY</label>
                <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
              </div>
              <div className="form-group third">
                <label>STATE</label>
                <input name="state" placeholder="State" value={form.state} onChange={handleChange} />
              </div>
              <div className="form-group third">
                <label>PINCODE / ZIP</label>
                <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} />
              </div>
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                id="saveinfo"
                name="saveinfo" 
                checked={form.saveinfo} 
                onChange={handleChange} 
              />
              <label htmlFor="saveinfo">SAVE THIS INFORMATION FOR NEXT TIME</label>
            </div>
          </div>

          <div className="checkout-section">
            <div className="section-header">
              <span className="section-icon">💳</span>
              <h2>PAYMENT METHOD</h2>
            </div>

            <div className="payment-options">
              <div 
                className={`payment-card ${paymentMethod === "online" ? "active" : ""}`}
                onClick={() => setPaymentMethod("online")}
              >
                <div className="payment-card-info">
                  <span className="payment-title">Online Payment</span>
                  <span className="payment-desc">Pay securely via Razorpay (UPI, Card, NetBanking)</span>
                </div>
                <div className="check-icon">✓</div>
              </div>

              <div 
                className={`payment-card ${paymentMethod === "cod" ? "active" : ""}`}
                onClick={() => setPaymentMethod("cod")}
              >
                <div className="payment-card-info">
                  <span className="payment-title">Cash On Delivery</span>
                  <span className="payment-desc">Pay when your order arrives (+₹100 fee)</span>
                </div>
                <div className="check-icon">✓</div>
              </div>
            </div>

            <div className="checkout-footer-desktop">
              <button className="confirm-order-btn" onClick={handleSubmit}>
                CONFIRM ORDER & PAY
              </button>
              <div className="secure-note">
                🔒 Secure SSL Encrypted Checkout
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="checkout-sidebar">
          <div className="summary-card">
            <h3>ORDER SUMMARY</h3>
            
            <div className="summary-item">
              <div className="summary-product-img">
                <img src={image} alt={type} />
              </div>
              <div className="summary-product-info">
                <span className="product-name">{type}</span>
                <span className="product-variant">Size: {selectedSize} | Qty: 1</span>
                <span className="product-price">₹{rate}</span>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{rate}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span className="free">FREE</span>
              </div>
              {paymentMethod === "cod" && (
                <div className="price-row">
                  <span>COD Charge</span>
                  <span>₹100</span>
                </div>
              )}
              <div className="price-total">
                <span>Total</span>
                <span>₹{paymentMethod === "cod" ? parseInt(rate) + 100 : rate}</span>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
}


export default Pay;
