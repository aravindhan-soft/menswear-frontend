import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar2(){
    const navigate=useNavigate();
    return(
<div className='ncontainer'>
<div>
    <h1 className='login' onClick={()=>navigate("/")}>LOGIN</h1>

</div>

<div>
<h1 className='signup'onClick={()=>navigate("/signup")}>SIGNUP</h1>
</div>

</div>
    );
}
export default Navbar2;