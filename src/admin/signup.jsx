import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "./navbar2";

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [phonenumber, setPhonenumber] = useState("");
    const [pass_word, setpass_word] = useState("");
    const [confirm_pass_word, setConfirm_pass_word] = useState("");

async function onClick(event) {
  event.preventDefault();

  if (pass_word !== confirm_pass_word) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await axios.post("http://menswear-backend-production.up.railway.app/api/signup", {
      si_id: Date.now().toString(), // Unique ID
      phonenumber,
      pass_word,
      confirm_pass_word,
    });

    if (res.data && res.data.message) {
      alert("Signup successful 🎉");
      navigate("/admin/earning"); 
    } else {
      alert(res.data.error || "Signup failed, please try again!");
    }
  } catch (err) {
    console.error("Error connecting to server:", err);
    alert("Error connecting to the server!");
  }
}

    return (
        <div className="login-page">
            <div className="login-card">
                <Navbar2 />
                <div className="login-header">
                    <h2>Create Account</h2>
                    <p>Join KUDANTHAI MENS WEAR family</p>
                </div>

                <div className="input-group">
                    <input
                        className="phnum"
                        placeholder="Phone Number"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="pass"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={pass_word}
                        onChange={(e) => setpass_word(e.target.value)}
                    />
                    <span
                        className="eyeicon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>

                <div className="input-group">
                    <input
                        className="pass"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirm_pass_word}
                        onChange={(e) => setConfirm_pass_word(e.target.value)}
                    />
                </div>

                <button className="button" onClick={onClick}>
                    SIGN UP
                </button>
            </div>
        </div>
    );
}

export default Signup;