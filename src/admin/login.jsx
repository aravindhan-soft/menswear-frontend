import { FaEye ,FaEyeSlash} from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar2";
function Login(){

const navigate=useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [phonenumber,setphonenumber]=useState("");
const [pass_word,setpass_word]=useState("");

const handleLogin = async () => {

  if (!phonenumber || !pass_word) {
    alert("Enter phone number and password");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phonenumber: phonenumber,
        pass_word: pass_word
      })
    });

    const data = await response.json();

if (data.success) {

  localStorage.setItem("role", data.role);

  if (data.role === "SHOP") {
    localStorage.setItem("shopId", data.shopid);
    localStorage.setItem("shopname", data.shopname);
  }

  alert("Login successful");

  navigate("/admin/earning");
}
    else {
      alert(data.message);
    }

  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

    return (
        <div className="login-page">
            <div className="login-card">
                <Navbar2 />
                <div className="login-header">
                    <h2>Welcome Back</h2>
                    <p>Enter your details to access your account</p>
                </div>

                <div className="input-group">
                    <input 
                        className="phnum" 
                        placeholder="Phone Number" 
                        onChange={e => setphonenumber(e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <input 
                        className="pass" 
                        type={showPassword ? "text" : "password"}
                        placeholder="Password" 
                        onChange={e => setpass_word(e.target.value)} 
                    />
                    <span className="eyeicon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>

                <div className="login-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <button className="fobutton" onClick={() => navigate("/forgetpassword")}>
                        Forgot Password?
                    </button>

                </div>

                <button className="button" onClick={handleLogin}>
                    LOG IN
                </button>
            </div>
        </div>
    );
}
export default Login;