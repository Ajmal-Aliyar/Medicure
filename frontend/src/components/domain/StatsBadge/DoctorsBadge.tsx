import { StatBadge } from './StatBadge';

const doctorImages = [
  "https://res.cloudinary.com/dimcaj6yj/image/upload/v1748067866/doctordp3_wjm7s7.jpg",
  "https://res.cloudinary.com/dimcaj6yj/image/upload/v1748067865/doctordp2_hpnmvv.jpg",
  "https://res.cloudinary.com/dimcaj6yj/image/upload/v1748067865/doctordp1_gg1noc.jpg"
];

export const DoctorsBadge = () => (
  <StatBadge images={doctorImages} count="870+" label="Doctors" />
);
