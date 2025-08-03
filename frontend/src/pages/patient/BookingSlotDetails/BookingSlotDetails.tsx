import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SlotList } from "./components/SlotList";
import { patientSlotService } from "@/services/api/patient/slot";
import type { ISlot } from "@/types/slot";
import { getNext7Days } from "@/utils/daysUtil";
import SevenDaysFilter from "@/components/domain/filters/SevenDaysFilter";
import { Pagination } from "@/components/ui/Pagination";
import { useCheckoutSession } from "@/hooks";

const BookingSlotDetails = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(getNext7Days()[0].value);
  const { doctorId } = useParams();

  useEffect(() => {
    const fetchSlots = async () => {
      if (!doctorId) return;
      try {
        const { data, meta } = await patientSlotService.getDoctorSlotsForBooking(doctorId, selectedDate, page);
        setSlots(data);
        setTotalPages(meta.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch slots:", error);
      }
    };

    fetchSlots();
  }, [selectedDate, doctorId, page]);

  const { checkoutPayment } = useCheckoutSession()
  
      const handleBook = async (slotId: string) => {
          await checkoutPayment(slotId);
      };
  return (
    <div className="min-w-5xl mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4 text-secondary">Available Slots</h2>
      
      <SevenDaysFilter
        day={selectedDate}
        setDay={(day) => {
          setSelectedDate(day);
          setPage(1); // Reset to first page on date change
        }}
        className="min-w-[100px] px-1 py-2"
      />

      <SlotList slots={slots} onClick={handleBook} />

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default BookingSlotDetails;
