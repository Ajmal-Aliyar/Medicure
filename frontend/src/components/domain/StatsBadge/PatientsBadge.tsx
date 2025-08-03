import { StatBadge } from './StatBadge';

const patientImages = [
  "https://res.cloudinary.com/dimcaj6yj/image/upload/v1748068198/patient1_c48bye.jpg",
  "https://res.cloudinary.com/dimcaj6yj/image/upload/v1748068199/patient2_vwox1r.jpg",
  "https://res.cloudinary.com/dimcaj6yj/image/upload/v1748068198/patient1_c48bye.jpg",
];

export const PatientsBadge = () => (
  <StatBadge images={patientImages} count="340K+" label="Patients" />
);
