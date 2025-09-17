import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen min-w-screen bg-muted/10  flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="text-green-500 w-20 h-20" strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Payment Successful</h2>
        <p className="text-gray-600 mb-6">
          Thank you! Your payment was processed successfully.
        </p>
        <button
          onClick={() => navigate("/user/appointments")}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-xl transition duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
