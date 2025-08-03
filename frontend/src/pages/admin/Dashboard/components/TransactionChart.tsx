import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend,
} from "recharts";
import { format, subDays } from "date-fns";
import { adminTransactionService } from "@/services/api/admin/transaction";
import type { TransactionChartData } from "@/types/transaction";


const TransactionChart = () => {
  const [data, setData] = useState<TransactionChartData[]>([])

    const [endDate, setEndDate] = useState(new Date());
    const [startDate, setStartDate] = useState(subDays(new Date(), 30));
  
    useEffect(() => {
      const fetchSlotData = async () => {
        try {
          const formattedStartDate = format(startDate, 'yyyy-MM-dd');
          const formattedEndDate = format(endDate, 'yyyy-MM-dd');
         const details = await adminTransactionService.getTransactionChartDetails(
            formattedStartDate,
            formattedEndDate
          );
          setData(details);
        } catch (error) {
          console.error('Failed to fetch slot chart data', error);
        }
      };
  
      fetchSlotData();
    }, [startDate, endDate]);

  return (
    <>
      <div className='mb-6 p-3 border-b border-border flex justify-between'><p className="text-secondary font-medium text-md ">
        Revenue Overview
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" name="Amount" />
              <Line type="monotone" dataKey="totalTransactions" stroke="#51aff6" name="Transactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div></>
  );
};

export default TransactionChart;
