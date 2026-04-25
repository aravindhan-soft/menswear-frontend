import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "./navbar2";

function ShopRegister() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [shopname, setShopname] = useState("");
    const [shopaddress, setShopaddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logo, setLogo] = useState(null);

    async function onClick(event) {
        event.preventDefault();

        if (!shopname || !shopaddress || !phonenumber || !email || !password) {
            alert("All fields are required!");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("shopname", shopname);
            formData.append("shopaddress", shopaddress);
            formData.append("phonenumber", phonenumber);
            formData.append("email", email);
            formData.append("password", password);

            // IMPORTANT – always append logo
            formData.append("logo", logo);

            const res = await axios.post(
                "http://localhost:5000/api/shopregister",
                formData
            );

            if (res.data && res.data.message) {
                alert("Shop Registration successful 🎉");
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
                    <h2>Partner With Us</h2>
                    <p>Register your shop on KUDANTHAI MENS WEAR</p>
                </div>

                <div className="input-group">
                    <input
                        className="phnum"
                        placeholder="Shop Name"
                        value={shopname}
                        onChange={(e) => setShopname(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="phnum"
                        placeholder="Shop Address"
                        value={shopaddress}
                        onChange={(e) => setShopaddress(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="phnum"
                        placeholder="Phone Number"
                        type="tel"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="phnum"
                        placeholder="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* FIXED FILE INPUT WITH PREMIUM UI */}
                <div className="input-group">
                    <label className="file-label">
                        <span className={`file-label-text ${logo ? "active" : ""}`}>
                            {logo ? `✅ ${logo.name}` : "Upload Shop Logo (Image)"}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setLogo(file);
                            }}
                        />
                    </label>
                </div>

                <div className="input-group">
                    <input
                        className="pass"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <span
                        className="eyeicon"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ cursor: "pointer" }}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>

                <button className="button" onClick={onClick}>
                    REGISTER SHOP
                </button>
            </div>
        </div>
    );
}

export default ShopRegister;