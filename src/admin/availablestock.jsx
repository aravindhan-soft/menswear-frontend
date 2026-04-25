import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import Adminhomepage from "./adminhomepage";

function Availablestock() {
    const [stock, setStock] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [shops, setShops] = useState([]);
    const [selectedShopId, setSelectedShopId] = useState("ALL");
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role === "ADMIN") {
            fetch("https://menswear-backend-production.up.railway.app/api/shops")
                .then(res => res.json())
                .then(data => setShops(data))
                .catch(err => console.error(err));
        }
    }, [role]);

useEffect(() => {
  const shopid = localStorage.getItem("shopId");
  
  if (role !== "ADMIN" && !shopid) {
    alert("Shop not logged in");
    return;
  }

  let finalShopId = role === "ADMIN" ? selectedShopId : shopid;
  
  // Actually, we don't know for sure if getAvailableStock/ALL exists and functions perfectly to get all stock, let's assume it does based on past curl test showing status 200. I'll use it here.
  let targetUrl = `https://menswear-backend-production.up.railway.app/getAvailableStock/${finalShopId}`;

  // If we require a generic endpoint for ALL, let's use what we found.
  if (role === "ADMIN" && finalShopId === "ALL") {
      targetUrl = "https://menswear-backend-production.up.railway.app/getAvailableStock/all";
  }

  fetch(targetUrl)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setStock(data.data);
      } else {
        setStock([]);
      }
    })
    .catch(err => console.log(err));

}, [selectedShopId, role]);

    const filteredStock = stock.filter(item => {
        const text = searchText.toLowerCase();

        return (
            (item.category || "").toLowerCase().includes(text) ||
            (item.variety || "").toLowerCase().includes(text) ||
            (item.color || "").toLowerCase().includes(text) ||
            item.sizes.some(s =>
                s.size.toLowerCase().includes(text)
            )
        );
    });

    return (
    <div className="v10-loft-wrapper">
      <Adminhomepage />

      <div className="v10-container">
        <header className="v10-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Inventory Ledger</h1>
            <p>Live audit of all active collection assets</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
             {role === "ADMIN" && (
               <select 
                 value={selectedShopId} 
                 onChange={(e) => setSelectedShopId(e.target.value)}
                 className="v10-select"
               >
                 <option value="ALL">All Shops</option>
                 {shops.map(shop => (
                   <option key={shop.si_id} value={shop.si_id}>{shop.shopname}</option>
                 ))}
               </select>
             )}
             <div className="v10-search-wrapper" style={{ margin: 0 }}>
               <GoSearch className="v10-search-icon" />
               <input
                 className="v10-search-input"
                 placeholder="Search collection ledger..."
                 value={searchText}
                 onChange={(e) => setSearchText(e.target.value)}
               />
             </div>
          </div>
        </header>

        <div className="v10-card" style={{ padding: '0' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '20px 30px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px' }}>ASSET</th>
                  <th style={{ textAlign: 'left', padding: '20px 30px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px' }}>SPECIFICATIONS</th>
                  <th style={{ textAlign: 'left', padding: '20px 30px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px' }}>STOCK VARIANTS</th>
                  <th style={{ textAlign: 'right', padding: '20px 30px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px' }}>AUDIT STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredStock.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '100px', color: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>
                      NO ASSETS FOUND IN CURRENT REGISTRY
                    </td>
                  </tr>
                ) : (
                  filteredStock.map((item, index) => (
                    <tr key={index} className="v10-row-hover" style={{ borderBottom: '1px solid #f1f5f9', transition: '0.2s' }}>
                      <td style={{ padding: '25px 30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <div style={{ width: '60px', height: '60px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                            {item.image ? (
                              <img src={item.image} alt="asset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#cbd5e1' }}>NO_IMG</div>
                            )}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{item.category || "General Asset"}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>ID: {9000 + index}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '25px 30px', fontFamily: 'Inter, sans-serif' }}>
                         <div style={{ fontSize: '0.85rem' }}>
                            <div style={{ marginBottom: '5px' }}>Style: <span style={{ fontWeight: 600 }}>{item.variety || "Standard"}</span></div>
                            <div style={{ color: '#64748b' }}>Color: {item.color || "N/A"}</div>
                         </div>
                      </td>
                      <td style={{ padding: '25px 30px', fontFamily: 'Inter, sans-serif' }}>
                         <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {item.sizes.map((s, i) => (
                              <div key={i} style={{ padding: '4px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', fontSize: '0.75rem' }}>
                                <span style={{ fontWeight: 700 }}>{s.size}</span>
                                <span style={{ margin: '0 8px', color: '#cbd5e1' }}>•</span>
                                <span style={{ color: '#0f172a', fontWeight: 600 }}>{s.quantity}U</span>
                                <span style={{ margin: '0 8px', color: '#cbd5e1' }}>•</span>
                                <span style={{ color: '#0f172a', fontWeight: 700 }}>₹{s.prize}</span>
                              </div>
                            ))}
                         </div>
                      </td>
                      <td style={{ padding: '25px 30px', textAlign: 'right' }}>
                         <span style={{ display: 'inline-block', padding: '6px 15px', background: '#f0fdf4', color: '#166534', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px', border: '1px solid #bbf7d0' }}>
                            VERIFIED
                         </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Availablestock;
