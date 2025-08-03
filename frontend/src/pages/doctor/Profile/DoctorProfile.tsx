import { WeeklySchedule } from "./components/WeeklySchedule";
import Experience from "./components/Experience";
import Education from "./components/Education";
import MainProfile from "./components/MainProfile";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { doctorFeedbackService } from "@/services/api/doctor/feedback";
import type { FeedbackDetails } from "@/types/feedback";
import { Loader2 } from "lucide-react";
import { PatientCard } from "@/components/domain/Cards/PatientCard";
import { StarRating } from "@/components/ui/StarRating";
import { formatDateToLong, formatTimeTo12Hour } from "@/utils/formatDate";

const DoctorProfile = () => {
    const { doctor } = useSelector((state: RootState) => state.doctor);
    const [feedbacks, setFeedbacks] = useState<FeedbackDetails[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await doctorFeedbackService.getFeedbackDetails(doctor.id, 1);
                setFeedbacks(response.data);
            } catch (error) {
                console.error("Error fetching feedbacks", error);
            } finally {
                setLoading(false);
            }
        };

        if (doctor.id) fetchFeedbacks();
    }, [doctor]);

    return (
        <div className="flex justify-center w-full px-4 py-2">
            <div className="max-w-[900px] w-full p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <MainProfile doctor={doctor} />

                <div className="bg-white rounded-md shadow-md p-4 col-span-full">
                    <WeeklySchedule />
                </div>

                <Education doctor={doctor} />
                <Experience doctor={doctor} />

                <div className="bg-white rounded-md shadow-md p-4 col-span-full">
                    <h3 className="text-lg font-semibold mb-2">Patient Reviews</h3>

                    {loading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="animate-spin w-4 h-4" />
                            Loading feedbacks...
                        </div>
                    ) : feedbacks.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No reviews available.</p>
                    ) : (
                        <ul className="space-y-3">
                            {feedbacks.map((feedback) => (
                                <div key={feedback.id} className="grid grid-cols-3 border-b border-border ">
                                    <PatientCard patient={feedback.patient} isMe onView={() => ''} className="p-0 bg-white" />
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
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
