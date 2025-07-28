import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { clearFeedback } from "@/slices/globalSlice";
import { patientAppointmentService } from "@/services/api/patient/appointment";
import type { IFeedback } from "@/types/feedback";
import type { IRole } from "@/types/auth";
import { doctorAppointmentService } from "@/services/api/doctor/appointment";
import type { IAppointmentService } from "@/types/appointment";
import { adminAppointmentService } from "@/services/api/admin/appointment";

const MAX_CHARS = 300;

export const FeedbackModal = () => {
  const dispatch = useDispatch();
  const { appointmentId, feedbackId } = useSelector((state: RootState) => state.global.feedback);
  const { user } = useSelector((state: RootState) => state.auth);
  const isFeedbackCompleted = !!feedbackId;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState<IFeedback | null>(null);

  useEffect(() => {
    if (isFeedbackCompleted && appointmentId) {
      fetchFeedback();
    }
  }, [isFeedbackCompleted, appointmentId]);

  const fetchFeedback = async () => {
    try {
      const role = user?.role as IRole
      const services: Record<IRole, IAppointmentService> = {
        patient: patientAppointmentService,
        doctor: doctorAppointmentService,
        admin: adminAppointmentService,
      };

      if (!services[role]) {
        throw new Error("Invalid role");
      }
      const feedback = await services[role].getFeedbackByAppointmentId(appointmentId as string);
      setFeedback(feedback);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleFeedbackSubmit = async () => {
    try {
      await patientAppointmentService.submitFeedbackForAppointment(appointmentId as string, rating, comment);
      dispatch(clearFeedback());
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    }
  };

  if (!appointmentId) return null;

  const displayRating = isFeedbackCompleted ? feedback?.rating ?? 0 : hoverRating || rating;
  const displayComment = isFeedbackCompleted ? feedback?.comment ?? "" : comment;
  const isLimitExceeded = comment.length > MAX_CHARS;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <div
          className="bg-white absolute -right-10 top-0 rounded-full p-1 cursor-pointer"
          onClick={() => dispatch(clearFeedback())}
        >
          <X className="text-secondary" />
        </div>

        <h3 className="text-center text-lg font-semibold mb-4 text-gray-800">
          How was your experience?
        </h3>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={28}
              className={`cursor-pointer transition-all ${displayRating >= i ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              onMouseEnter={() => !isFeedbackCompleted && setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => !isFeedbackCompleted && handleRating(i)}
            />
          ))}
        </div>

        <div className="relative mb-4">
          <textarea
            rows={4}
            className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
            placeholder="Write your feedback..."
            maxLength={MAX_CHARS}
            value={displayComment}
            onChange={(e) => !isFeedbackCompleted && setComment(e.target.value)}
          ></textarea>
          <div
            className={`text-right text-xs mt-1 ${isLimitExceeded ? "text-red-500 font-medium" : "text-gray-500"
              }`}
          >
            {comment.length}/{MAX_CHARS}
          </div>
        </div>

        {!isFeedbackCompleted && (
          <Button
            className="w-full py-2 bg-gradient-to-r from-primar to-teal-400 text-white font-medium text-sm rounded-lg hover:to-teal-500"
            disabled={isLimitExceeded || rating === 0}
            onClick={handleFeedbackSubmit}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
