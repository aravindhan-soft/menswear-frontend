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
      const res = await axios.post("http://localhost:5000/api/generate-otp ", {
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
    const res = await axios.post("http://localhost:5000/api/verify-otp", {
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
    <div className="input2" style={{ textAlign: "center", marginTop: "100px" }}>
      <div>
        <input
          className="phnum"
          type="text"
          placeholder="ENTER YOUR PHONENUMBER"
          value={phonenumber}
          onChange={(e) => setphonenumber(e.target.value)}
        />
      </div>

      <div>
        <button className="fbutton" onClick={sendOTP}>
          SEND OTP
        </button>
      </div>

      <div>
        <input
          className="otp"
          type="number"
          placeholder="ENTER OTP"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
        />
      </div>

      <div>
        <button className="fbutton" onClick={verifyOTP}>
          SUBMIT
        </button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

export default Forgetpassword;
