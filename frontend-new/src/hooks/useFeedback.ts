import { useEffect, useState } from "react";
import { patientFeedbackService } from "@/services/api/patient/feedback";
import type { FeedbackDetails } from "@/types/feedback";

interface UseFeedbackResult {
  feedbacks: FeedbackDetails[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const useFeedback = (): UseFeedbackResult => {
  const [feedbacks, setFeedbacks] = useState<FeedbackDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchFeedbackDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, meta } = await patientFeedbackService.getFeedbackDetails(page);
        setFeedbacks(data);
        setTotalPages(meta.totalPages);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbackDetails();
  }, [page]);

  return { feedbacks, loading, error, page, totalPages, setPage };
};
