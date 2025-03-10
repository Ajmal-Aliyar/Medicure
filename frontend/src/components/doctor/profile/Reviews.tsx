import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../../store/slices/commonSlices/notificationSlice";
import { useState } from "react";
import { IFetchFeedbacks } from "../../../types/feedback/feedback";
import { fetchFeedbacksApi } from "../../../sevices/feedback/feedback";
import { StarIcon } from "lucide-react";

function Reviews() {
  const [feedback, setFeedback] = useState<IFetchFeedbacks[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoadingState] = useState(false);
  const dispatch = useDispatch();

  const loadFeedbacks = async () => {
    if (!hasMore || loading) return;

    setLoadingState(true);
    dispatch(setLoading(true));

    try {
      const response = await fetchFeedbacksApi("doctor", page, limit);
      if (response && response.feedbackData) {
        setFeedback((prev) => [...prev, ...response.feedbackData]);
        if (response.feedbackData.length < limit) setHasMore(false);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      dispatch(setError("Failed to load reviews"));
    } finally {
      dispatch(setLoading(false));
      setLoadingState(false);
    }
  };

  return (
    <div className="firstCard col-span-12 bg-white p-4 rounded-lg shadow-lg ">
      <p className="font-bold text-2xl mb-2 text-[#0c0b3eb5] flex justify-between border-b-[2px] border-gray-100">
        Reviews
      </p>
      <p className="text-xs">
        These stories represent patient opinions and experiences. They do not reflect the doctor's medical capabilities.
      </p>

      <div className="mt-3">
        {
          <div className="space-y-4">
            {feedback.map((review) => (
              <div key={review._id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={review.details.profileImage}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{review.details.fullName}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-4 h-4 ${i < (review.rating || 4) ? "text-yellow-500" : "text-gray-300"}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.comments}</p>
              </div>
            ))}
          </div>
         }
      </div>

      {hasMore && (
        <p
          className="text-end underline text-sm text-gray-500 mt-2 cursor-pointer"
          onClick={loadFeedbacks}
        >
          {loading ? "Loading..." : "Show more"}
        </p>
      )}
    </div>
  );
}

export default Reviews;
