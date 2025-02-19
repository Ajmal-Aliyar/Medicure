import React from "react";

const transactions = [
  {
    id: 1,
    from: "Alice",
    to: "Bob",
    amount: "$200",
    time: "2024-02-18 14:30",
    status: "Success",
  },
  {
    id: 2,
    from: "Charlie",
    to: "Alice",
    amount: "$150",
    time: "2024-02-18 12:15",
    status: "Pending",
  },
  {
    id: 3,
    from: "Dave",
    to: "Eve",
    amount: "$50",
    time: "2024-02-18 10:00",
    status: "Failed",
  },
];

const WalletPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* User Info */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-lg">Balance: <span className="font-semibold">$5,000</span></p>
      </div>

      {/* Transaction History */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border">
                  <td className="p-2 border">{tx.from}</td>
                  <td className="p-2 border">{tx.to}</td>
                  <td className="p-2 border">{tx.amount}</td>
                  <td className="p-2 border">{tx.time}</td>
                  <td className={`p-2 border font-semibold ${
                    tx.status === "Success" ? "text-green-500" :
                    tx.status === "Pending" ? "text-yellow-500" :
                    "text-red-500"
                  }`}>{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
