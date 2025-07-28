import { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { format } from "date-fns";

type Transaction = {
  id: string;
  amount: number;
  createdAt: string;
  type: string;
  direction: "credit" | "debit";
  doctorId: string;
};

type Props = {
  transactions: Transaction[];
  viewType: "day" | "week" | "month"
};

const groupBy = (transactions: Transaction[], type: "day" | "week" | "month") => {
  const map = new Map<string, number>();

  transactions.forEach((tx) => {
    if (tx.direction !== "credit") return;

    let key = "";
    const date = new Date(tx.createdAt);

    switch (type) {
      case "day":
        key = format(date, "yyyy-MM-dd");
        break;
      case "week":
        key = format(date, "yyyy-'W'II");
        break;
      case "month":
        key = format(date, "yyyy-MM");
        break;
    }

    map.set(key, (map.get(key) || 0) + tx.amount);
  });

  const result = Array.from(map.entries()).map(([key, value]) => ({
    date: key,
    amount: value,
  }));

  return result.sort((a, b) => a.date.localeCompare(b.date));
};

const TransactionChart = ({ transactions, viewType }: Props) => {

  const chartData = useMemo(() => groupBy(transactions, viewType), [transactions, viewType]);

  return (
    <div className="pr-8 mt-6">

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip formatter={(value: any) => `₹${value}`} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#51aff6" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
            />
        </LineChart>
      </ResponsiveContainer>

            </div>
  );
};

export default TransactionChart;
