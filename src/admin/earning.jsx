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

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard/stats")
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="dashboard">
      <Adminhomepage />
      <h2 className="dtitle">Dashboard</h2>

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

        {/* Monthly Earnings Line Chart */}
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