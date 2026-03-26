import { MdNotifications, MdDashboard, MdAttachMoney, MdStorage, MdCloudUpload } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

function Adminhomepage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className="admin-header">
                <div className="admin-logo">KUDANTHAI MENS WEAR <span style={{fontSize: '0.6rem', background: '#1a7431', color: 'white', padding: '2px 8px', borderRadius: '10px', marginLeft: '10px', verticalAlign: 'middle'}}>ADMIN</span></div>
                
                <div className="notification-icon">
                    <MdNotifications />
                </div>
            </div>

            <div className="admin-nav-bar">
                <button 
                    className={`admin-nav-btn ${isActive("/admin/todayorder") ? "active" : ""}`} 
                    onClick={() => navigate("/admin/todayorder")}
                >
                    <MdDashboard /> Today Order
                </button>
                
                <button 
                    className={`admin-nav-btn ${isActive("/admin/earning") ? "active" : ""}`} 
                    onClick={() => navigate("/admin/earning")}
                >
                    <MdAttachMoney /> Earnings
                </button>
                
                <button 
                    className={`admin-nav-btn ${isActive("/admin/available") ? "active" : ""}`} 
                    onClick={() => navigate("/admin/available")}
                >
                    <MdStorage /> Available Stock
                </button>
                
                <button 
                    className={`admin-nav-btn ${isActive("/admin/upload") ? "active" : ""}`} 
                    onClick={() => navigate("/admin/upload")}
                >
                    <MdCloudUpload /> Upload Stock
                </button>
            </div>
        </>
    );
}

export default Adminhomepage;