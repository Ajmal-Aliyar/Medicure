import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { getChartDetailsApi } from "../../../sevices/dashboardServices";

type DataPoint = {
  date: string;
  appointments: number;
  revenue: number;
};
type RangeKey = "Last 7 Days" | "Last 30 Days";

const isRangeKey = (value: string): value is RangeKey => {
  return value === "Last 7 Days" || value === "Last 30 Days";
};

export default function AdvancedChart() {
  const [selectedRange, setSelectedRange] = useState<RangeKey>("Last 30 Days");
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);


  useEffect(() => {
    console.log(selectedRange, 'sdf');

    const getChartDetails = async () => {
      const data = await getChartDetailsApi()
      setFilteredData(data[selectedRange])
    }
    getChartDetails()
  }, [selectedRange])

  return (
    <div className=" w-full max-w-4xl mx-auto">
      <div className="flex justify-end items-center mb-4">
        <select
          className="border rounded-md text-gray-700"
          value={selectedRange}
          onChange={(e) => {
            const value = e.target.value;
            if (isRangeKey(value)) {
              setSelectedRange(value);
            }
          }}
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
            <Line type="monotone" dataKey="appointments" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
