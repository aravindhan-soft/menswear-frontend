import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgetpassword2() {
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  const Phonenumber = localStorage.getItem("resetPhone");

  const handleConfirm = async () => {
    if (newpassword !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reset-password", {
        phonenumber: Phonenumber,
        newpassword,
      });

      alert(res.data.message);
      if (res.data.success) {
        navigate("/admin/earning"); // redirect after success
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="input2">
        <div className="login-header">
          <h2>New Password</h2>
          <p>Create a strong password for your account</p>
        </div>

        <div className="input-group">
          <input
            className="phnum"
            type="password"
            placeholder="New Password"
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            className="phnum"
            type="password"
            placeholder="Confirm New Password"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
        </div>

        <button className="button" style={{ marginTop: '20px' }} onClick={handleConfirm}>
          SET NEW PASSWORD
        </button>
      </div>
    </div>
  );
}

export default Forgetpassword2;
