import { useDispatch } from "react-redux";
import { setLoading } from "@/slices/globalSlice";
import { patientPaymentService } from "@/services/api/patient/payment";

export const useCheckoutSession = () => {
  const dispatch = useDispatch();

  const checkoutPayment = async (slotId: string) => {
    try {
      dispatch(setLoading(true));
      const { sessionUrl } = await patientPaymentService.checkoutSession(slotId);

      if (!sessionUrl) {
        throw new Error("No session URL received.");
      }

      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Payment checkout error:", error);
      dispatch(setLoading(false));
      throw error;
    }
  };

  return { checkoutPayment };
};
