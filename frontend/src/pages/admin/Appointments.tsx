import { useEffect, useState } from "react";
import { fetchFeedbacksAdminApi } from "../../sevices/feedback/feedback";
import { Loader2, CalendarCheck } from "lucide-react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await fetchFeedbacksAdminApi(1, 10); 
        if (response ) {
            console.log(response,'ds')
        } else {
          setError("No appointments found.");
        }
      } catch (err) {
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
        <CalendarCheck className="w-6 h-6 text-blue-500" />
        Appointments
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <div className="mt-4 space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
             <div>haiii</div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No appointments available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Appointments;
