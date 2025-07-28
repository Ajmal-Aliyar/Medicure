import { DoctorCard } from "@/components/domain/Cards";
import { Pagination } from "@/components/ui/Pagination";
import { StarRating } from "@/components/ui/StarRating";
import { useFeedback } from "@/hooks/useFeedback";
import { formatDate, formatDateToLong, formatTimeTo12Hour, parseToMD } from "@/utils/formatDate";
import type { FC } from "react";

const PatientFeedbackPage: FC = () => {
    const { feedbacks, loading, error, page, totalPages, setPage } = useFeedback();

    return (
        <div className="">
            <h1 className="text-secondary font-medium text-md mb-3">Your Feedbacks</h1>

            {loading && <p>Loading feedbacks...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && feedbacks.length === 0 && <p>No feedbacks found.</p>}

            <div className="space-y-4">
                {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="grid grid-cols-3 border-b border-border ">
                        <DoctorCard doctor={feedback.doctor} isMe onView={() => ''} className="p-0" />
                        <div className="p-4 col-span-2 ">
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                <StarRating rating={feedback.rating} /> <p className="mt-2 text-xs text-gray-500">
                                   {formatDateToLong(feedback.createdAt.toString())},  {formatTimeTo12Hour(feedback.createdAt.toString())} 
                                </p>
                            </p>
                            <p className="mt-1 text-muted-dark">{feedback.comment}</p>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    className="py-4"
                />
            )}
        </div>
    );
};

export default PatientFeedbackPage;
