import { useEffect, useState } from 'react';
import { doctorSlotService } from '@/services/api/doctor/slot';
import type { SlotChartData } from '@/types/slot';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { subDays, format } from 'date-fns';

const AppointmentSlotChart = () => {
  const [data, setData] = useState<SlotChartData[]>([]);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(subDays(new Date(), 30));

  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        const detail = await doctorSlotService.getStats(
          formattedStartDate,
          formattedEndDate
        );
        setData(detail);
      } catch (error) {
        console.error('Failed to fetch slot chart data', error);
      }
    };

    fetchSlotData();
  }, [startDate, endDate]);

  return (
    <>
      <div className='mb-6 p-3 border-b border-border flex justify-between'><p className="text-secondary-dark font-medium text-md ">
        Slot Overview
      </p>
        <div className="flex gap-1 items-center text-muted-dark">
          start:
          <input
            id="date-picker"
            type="date"
            value={format(startDate, 'yyyy-MM-dd')}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className=" text-muted-dark cursor-pointer w-28 mr-3"
          />

          end:
          <input
            id="date-picker"
            type="date"
            value={format(endDate, 'yyyy-MM-dd')}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className=" text-muted-dark cursor-pointer w-28"
          />

        </div>
      </div>

      <div className="w-full h-auto space-y-4">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={1}>
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSlots" fill="#0c0b3e21" name="Total Slots" />
              <Bar dataKey="bookedSlots" fill="#51aff6" name="Booked Slots" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div></>
  );
};

export default AppointmentSlotChart;
