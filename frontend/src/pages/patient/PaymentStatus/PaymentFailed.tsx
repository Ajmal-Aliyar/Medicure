import { Button } from "@/components/ui/Button";
import { useCheckoutSession } from "@/hooks";
import { patientPaymentService } from "@/services/api/patient/payment";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const { checkoutPayment } = useCheckoutSession();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [slotId, setSlotId] = useState<string | null>(null);

  const handleRetry = async () => {
    if (slotId) {
      await checkoutPayment(slotId);
    }
  };

  useEffect(() => {
    if (!sessionId) return;

    const fetchSessionAndCancel = async () => {
      try {
        const result = await patientPaymentService.fetchSessionDetails(sessionId);
        const session = result.data.data;
        const extractedSlotId = session.metadata?.slotId;

        if (extractedSlotId) {
          setSlotId(extractedSlotId);
          await patientPaymentService.cancelCheckout(extractedSlotId);
        }
      } catch (err) {
        console.log(err);
        navigate(-1);
      }
    };

    fetchSessionAndCancel();
  }, [sessionId, navigate]);

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center bg-white shadow-lg px-3 py-6 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="red"
          width="80"
          height="80"
          style={{ marginBottom: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>

        <h1 style={{ color: "#b00020", marginBottom: "10px" }}>Payment Failed</h1>
        <p
          style={{
            color: "#7f0000",
            marginBottom: "30px",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          Unfortunately, your payment could not be processed. Please check your
          payment details and try again.
        </p>

        <div className="flex gap-4 ">
        <Button variant="muted" className="py-2 px-3" onClick={() => navigate('/find')}>Go back</Button>
        <Button variant="red" className="py-2 px-3" onClick={handleRetry}>Retry Payment</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
