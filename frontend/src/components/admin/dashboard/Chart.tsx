import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const dataSets:any = {
  "Last 7 Days": [
    { date: "Day 1", sales: 400, revenue: 200 },
    { date: "Day 2", sales: 700, revenue: 500 },
    { date: "Day 3", sales: 500, revenue: 300 },
    { date: "Day 4", sales: 900, revenue: 600 },
    { date: "Day 5", sales: 650, revenue: 400 },
    { date: "Day 6", sales: 850, revenue: 700 },
    { date: "Day 7", sales: 750, revenue: 500 },
  ],
  "Last 30 Days": Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    sales: Math.floor(Math.random() * 1000),
    revenue: Math.floor(Math.random() * 800),
  })),
};

export default function AdvancedChart() {
  const [selectedRange, setSelectedRange] = useState("Last 7 Days");
  const filteredData = dataSets[selectedRange];

  return (
    <div className=" w-full max-w-4xl mx-auto">
      <div className="flex justify-end items-center mb-4">
        <select 
          className="border rounded-md text-gray-700" 
          onChange={(e) => setSelectedRange(e.target.value)}
          value={selectedRange}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
