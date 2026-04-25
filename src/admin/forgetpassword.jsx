import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgetpassword() {
  const navigate = useNavigate();
  const [phonenumber, setphonenumber] = useState("");
  const [otp, setotp] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Function to send OTP
  const sendOTP = async () => {
    if (!phonenumber) {
      alert("Please enter your phone number!");
      return;
    }

    try {
      const res = await axios.post("http://menswear-backend-production.up.railway.app/api/generate-otp ", {
        phonenumber,
      });

      if (res.data.success) {
        alert(`OTP sent successfully! (Testing OTP: ${res.data.otp})`);
      }
    } catch (err) {
      console.error(err);
      alert("can't found user. Try again.");
    }
  };

  // ✅ Function to verify OTP
const verifyOTP = async () => {
  if (!otp) {
    alert("Please enter OTP!");
    return;
  }

  try {
    const res = await axios.post("http://menswear-backend-production.up.railway.app/api/verify-otp", {
      phonenumber,
      otp,
    });

    if (res.data.success) {
      alert("OTP verified successfully!");

      // ✅ Save phone number to localStorage before moving next page
      localStorage.setItem("resetPhone", phonenumber);

      window.location.href = "/forgetpassword2"; // Move to next page
    } else {
      setMessage(res.data.message || "Invalid OTP");
    }
  } catch (err) {
    console.error(err);
    setMessage("Invalid or expired OTP");
  }
};


  return (
    <div className="login-page">
      <div className="input2">
        <div className="login-header">
          <h2>Reset Password</h2>
          <p>We will send an OTP to your registered phone number</p>
        </div>

        <div className="input-group">
          <input
            className="phnum"
            type="text"
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
          />
        </div>

        <button className="button" onClick={sendOTP}>
          SEND OTP
        </button>

        <div className="otp-wrapper">
          <label style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>ENTER OTP</label>
          <input
            className="otp"
            type="text"
            placeholder="••••••"
            maxLength="6"
            value={otp}
            onChange={(e) => setotp(e.target.value)}
          />
        </div>

        <button className="fbutton" onClick={verifyOTP}>
          VERIFY & CONTINUE
        </button>

        {message && (
          <p style={{ 
            marginTop: '1.5rem', 
            color: message.toLowerCase().includes('success') ? '#1a7431' : '#ef4444',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Forgetpassword;
