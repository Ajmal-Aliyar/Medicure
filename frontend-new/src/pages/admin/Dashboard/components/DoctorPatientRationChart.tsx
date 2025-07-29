import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import type { FC } from "react";

type DoctorPatientLogin = {
  date: string;
  doctorCount: number;
  patientCount: number;
};


export const mockDoctorPatientLogin = [
  { date: "2025-07-01", doctorCount: 12, patientCount: 0 },
  { date: "2025-07-02", doctorCount: 9, patientCount: 41 },
  { date: "2025-07-03", doctorCount: 25, patientCount: 5 },
  { date: "2025-07-04", doctorCount: 30, patientCount: 50 },
  { date: "2025-07-05", doctorCount: 48, patientCount: 60 },
];

const DoctorPatientRatioChart: FC<{ data?: DoctorPatientLogin[] }> = ({
  data = mockDoctorPatientLogin,
}) => {
  return (
    <div className="p-4 w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="doctorCount" stroke="#51aff6" name="Doctors" />
          <Line type="monotone" dataKey="patientCount" stroke="#8884d8" name="Patients" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DoctorPatientRatioChart;
