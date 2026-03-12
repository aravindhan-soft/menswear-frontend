import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Pay() {

const location = useLocation();

const routerProduct = location.state?.product;
const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

const productData = routerProduct || storedProduct;

if (!productData) {
  return <h2 style={{ textAlign: "center" }}>No Order Found</h2>;
}

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
    const saveRes = await fetch("http://localhost:5000/api/save", {
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

  } catch (err) {
    alert("Failed to save user details");
    return;
  }

  // 🔹 CREATE ORDER
  try {
    const orderRes = await fetch("http://localhost:5000/api/order/create", {
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
    const res = await fetch("http://localhost:5000/api/payment/create-order", {
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
    <div className="information">
      <h2 className="contact">CONTACT DETAILS</h2>

      <input className="email" name="contact" placeholder="EMAIL OR PHONE NUMBER" value={form.contact} onChange={handleChange} />

      <div className="row">
        <input className="name" name="firstname" placeholder="FIRST NAME" value={form.firstname} onChange={handleChange} />
        <input className="lname" name="lastname" placeholder="LAST NAME" value={form.lastname} onChange={handleChange} />
      </div>

      <input className="country" name="country" placeholder="COUNTRY" value={form.country} onChange={handleChange} />
      <input className="address" name="streetname" placeholder="ADDRESS" value={form.streetname} onChange={handleChange} />
      <input className="etc" name="apartment" placeholder="APARTMENT, ETC (Optional)" value={form.apartment} onChange={handleChange} />

      <div className="row">
        <input className="city" name="city" placeholder="CITY" value={form.city} onChange={handleChange} />
        <input className="state" name="state" placeholder="STATE" value={form.state} onChange={handleChange} />
        <input className="pincode" name="pincode" placeholder="PINCODE" value={form.pincode} onChange={handleChange} />
      </div>

      <div className="box1">
        <label>
          <input type="checkbox" name="saveinfo" checked={form.saveinfo} onChange={handleChange} />
          SAVE THIS INFORMATION
        </label>
      </div>

      <h3>PAYMENT METHOD</h3>

      <div className="pm-row">
        <input type="radio" className="pm" name="payment" value="gpay" onChange={(e) => setPaymentMethod(e.target.value)} />
        <span>Google Pay</span>
      </div>

      <div className="pm-row">
        <input type="radio" className="pm" name="payment" value="netbanking" onChange={(e) => setPaymentMethod(e.target.value)} />
        <span>Net Banking</span>
      </div>

      <div className="pm-row">
        <input type="radio" className="pm" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} />
        <span>Cash On Delivery</span>
      </div>

      <br />

      <button className="order" onClick={handleSubmit}>
        ORDER CONFIRM
      </button>
    </div>
  );
}

export default Pay;
