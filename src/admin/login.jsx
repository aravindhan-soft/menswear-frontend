import { FaEye ,FaEyeSlash} from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./navbar2";
function Login(){

const navigate=useNavigate();
const [showPassword, setShowPassword] = useState(true);
const [phonenumber,setphonenumber]=useState("");
const [pass_word,setpass_word]=useState("");


  const handleLogin = async () => {
    if (!phonenumber || !pass_word) {
      alert("Please enter both phone number and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phonenumber, pass_word }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Welcome ${data.username}`);
        navigate("/earning"); // ✅ go to next page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Server error — check backend connection");
    }
  };

    return(
        <div>
        <Navbar2/>
            
<div className="input">
            <div>
            <input className="phnum" placeholder=" PHONENUMBER"  onChange={e=>setphonenumber(e.target.value)}></input>
            </div>
<br></br>
            <div>
            <input className="pass"   type={showPassword ? "text" : "password"}
            placeholder="PASSWORD" onChange={e=>setpass_word(e.target.value)} />
            <span className="eyeicon" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ?   <FaEye /> : <FaEyeSlash />}
        </span>
            </div>


<div>
            <button className="fobutton" onClick={()=>navigate("/forgetpassword")}>FORGET PASSWORD ?</button></div>
<div>
                    <button className="button"onClick={handleLogin}>LOGIN</button></div>


</div>
        </div>


    );
}
export default Login;