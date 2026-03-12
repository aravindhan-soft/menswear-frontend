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
        navigate("/earning"); // redirect after success
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="input2">
      <div>
        <input
          className="phnum"
          type="password"
          placeholder="NEW PASSWORD"
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
        />
      </div>

      <div className="fpass">
        <input
          className="phnum"
          type="password"
          placeholder="CONFIRM PASSWORD"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
      </div>

      <div className="fconfirm">
        <button className="button" onClick={handleConfirm}>
          CONFIRM
        </button>
      </div>
    </div>
  );
}

export default Forgetpassword2;
