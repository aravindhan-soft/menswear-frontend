import { MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Adminhomepage(){

    const navigate=useNavigate();

    return(
        <>
            <div className='navbar1'>
                <div className='navlogo1'> KUDANTHAI MENS WEAR </div>

                <div className='icons1'>
                <MdNotifications  /> </div>

            </div>

            <div className="asbar">
                <button className="abutton" onClick={()=>navigate("/admin/todayorder")}>TODAY ORDER</button>
<br></br>
                
<br></br>
                <button className="abutton"onClick={()=>navigate("/admin/earning")}>EARNINGS</button>
<br></br>
               
<br></br>
                <button className="abutton" onClick={()=>navigate("/admin/available")}>AVAILABLE STOCK</button>
<br></br>
                <button className="abutton" onClick={()=>navigate("/admin/upload")}>UPLOAD STOCK</button>
            </div>
</>
        );
}
export default Adminhomepage;