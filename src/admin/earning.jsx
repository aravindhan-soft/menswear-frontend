import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import Adminhomepage from "./adminhomepage";

function Dashboard() {

  const [stats, setStats] = useState({
    totalOrders: 0,
    todayOrders: 0,
    totalEarnings: 0,
    todayEarnings: 0,
    chartData: []
  });

  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("ALL");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (role === "ADMIN") {
      axios.get("https://menswear-backend-production.up.railway.app/api/shops")
        .then(res => setShops(res.data))
        .catch(err => console.error(err));
    }
  }, [role]);

  useEffect(() => {
    const shopId = localStorage.getItem("shopId");

    let url = "";

    if (role === "ADMIN") {
      if (selectedShopId === "ALL") {
        url = "https://menswear-backend-production.up.railway.app/dashboard/stats-all";
      } else {
        url = `https://menswear-backend-production.up.railway.app/dashboard/stats/${selectedShopId}`;
      }
    } else {
      url = `https://menswear-backend-production.up.railway.app/dashboard/stats/${shopId}`;
    }

    axios.get(url)
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, [selectedShopId, role]);

  return (
    <div className="dashboard">
      <Adminhomepage />
      <div style={{ display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', marginTop: '10px' }}>
        <h2 className="dtitle" style={{ margin: 0 }}>Dashboard</h2>
        {role === "ADMIN" && (
          <div style={{ position: 'absolute', right: 0 }}>
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
          </div>
        )}
      </div>

      {/* ===== CARDS ===== */}
      <div className="dcards">

        <div className="dcard">
          <h3>TODAY EARNINGS</h3>
          <p>₹{stats.todayEarnings}</p>
        </div>

        <div className="dcard">
          <h3>TOTAL EARNINGS</h3>
          <p>₹{stats.totalEarnings}</p>
        </div>

        <div className="dcard">
          <h3>TOTAL ORDERS</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div className="dcard">
          <h3>TODAY ORDERS</h3>
          <p>{stats.todayOrders}</p>
        </div>

      </div>

      {/* ===== CHARTS SECTION ===== */}
      <div className="dcharts">

        {/* Monthly Earni ngs Line Chart */}
        <div className="dchart">
          <h3>MONTHLY EARNINGS</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#008000"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Orders Bar Chart */}
        <div className="dchart">
          <h3>MONTHLY ORDERS</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="orders"
                fill="#008000"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;