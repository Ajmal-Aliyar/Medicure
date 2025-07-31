import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import { EnterEmail } from "@/pages/auth/VerifyEmail";
import { EnterOtp } from "@/pages/auth/VerifyOtp";
import { ChangePassword } from "@/pages/auth/ChangePassword";
import { AdminLogin } from "@/pages/auth/AdminLogin";

import HomePage from "@/pages/public/Home/HomePage";
import UnAuthorizedRoute from "@/routes/UnAuthorizedRoute";
import { AuthLayout, PublicLayout } from "@/layouts/CommonLayout";
import AuthorizedRoute from "@/routes/AuthorizedRoute";
import { DoctorLayout } from "@/layouts/DoctorLayout";
import PrivateRoute from "@/routes/PrivateRoute";
import { AdminLayout } from "@/layouts/AdminLayout/AdminLayout";
import DoctorPage from "@/pages/admin/Doctors/DoctorPage";
import FindPage from "@/pages/public/Find/FindPage";
import DoctorProfile from "@/pages/doctor/Profile/DoctorProfile";
import BookingSlotDetails from "@/pages/patient/BookingSlotDetails/BookingSlotDetails";
import PaymentFailed from "@/pages/patient/PaymentStatus/PaymentFailed";
import UserDriveLayout from "@/layouts/PatientLayout/UserDriveLayout";
import PatientProfile from "@/pages/patient/Profile/PatientProfile";
import AppointmentPage from "@/pages/patient/Appointment/AppointmentPage";
import DoctorAppointmentPage from "@/pages/doctor/Appointments/DoctorAppointmentPage";
import AdminAppointmentPage from "@/pages/admin/appointments/AdminAppointmentPage";
import DoctorSlotPage from "@/pages/doctor/Slots/DoctorSlotPage";
import AdminSlotPage from "@/pages/admin/Slots/AdminSlotPage";
import PatientFinancePage from "@/pages/patient/Finance/PatientFinancePage";
import AdminFinancePage from "@/pages/admin/Finance/AdminFinancePage";
import DoctorFinancePage from "@/pages/doctor/Finance/DoctorFinancePage";
import ConsultationPage from "@/pages/consultation/ConsultationPage";
import { LiveInteractionLayout } from "@/layouts/LiveInteractionLayout/LiveInteractionLayout";
import DoctorDashboard from "@/pages/doctor/Dashboard/DoctorDashboard";
import AdminDashboard from "@/pages/admin/Dashboard/AdminDashboard";
import PatientFeedbackPage from "@/pages/patient/Feedback/FeedbackPage";
import ViewPrescription from "@/pages/consultation/ViewPrescription";
import MedicalRecord from "@/pages/patient/MedicalRecord/MedicalRecord";
import ChatPage from "@/pages/chat/ChatPage";
import AdminPatientsPage from "@/pages/admin/patients/AdminPatientsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element:  <PublicLayout />,
    children: [
      {path: '',  element:  <HomePage />},
      {path: 'view/prescription/:prescriptionId', element:<AuthorizedRoute allowedRole={["patient", "doctor"]}> <ViewPrescription /></AuthorizedRoute> },
      {path: 'find', element: <FindPage /> },
      {path: 'book-slots/:doctorId', element: <AuthorizedRoute allowedRole={["patient"]}><BookingSlotDetails /></AuthorizedRoute>  },
      {path: 'cancel-payment', element: <AuthorizedRoute allowedRole={["patient"]}><PaymentFailed /></AuthorizedRoute> },
    ]
  },
  {
    path: "/user",
    element:  <AuthorizedRoute allowedRole={["patient"]}><UserDriveLayout /></AuthorizedRoute>,
    
    children: [
      {path: 'profile',  element:  <PatientProfile />},
      {path: 'appointments',  element:  <AppointmentPage />},
      {path: 'finances',  element:  <PatientFinancePage />},
      {path: 'medical-records',  element:  <MedicalRecord />},
      {path: 'feedbacks',  element:  <PatientFeedbackPage />},

    ]
  },
  {
    path: "/user/auth",
    element: <UnAuthorizedRoute><AuthLayout /></UnAuthorizedRoute> ,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "enter-email", element: <EnterEmail /> },
      { path: "verify-otp", element: <EnterOtp /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "/doctor/auth",
    element: <UnAuthorizedRoute><AuthLayout /></UnAuthorizedRoute>,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "enter-email", element: <EnterEmail /> },
      { path: "verify-otp", element: <EnterOtp /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "/doctor",
    element: <AuthorizedRoute allowedRole={["doctor"]}><DoctorLayout /></AuthorizedRoute>,
    children: [
      { path: "dashboard", element: <DoctorDashboard /> },
      { path: "profile/:doctorId", element: <DoctorProfile /> },
      { path: "appointments", element: <DoctorAppointmentPage /> },
      { path: "slots", element: <DoctorSlotPage /> },
      { path: "finances", element: <DoctorFinancePage /> },
    ],
  },

  {
    path: "/doctor/verify-details", element: <PrivateRoute/>
  },

  {
    path: "/admin/auth",
    element: <UnAuthorizedRoute><AuthLayout /></UnAuthorizedRoute>,
    children: [
      { path: "login", element: <AdminLogin /> },
    ],
  },
  {
    path: "/admin",
    element: <AuthorizedRoute allowedRole={["admin"]}><AdminLayout /></AuthorizedRoute>, 
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "doctors", element:<DoctorPage/>},
      { path: "appointments", element:<AdminAppointmentPage/>},
      { path: "slots", element:<AdminSlotPage/>},
      { path: "finances", element:<AdminFinancePage/>},
      { path: 'patients', element: <AdminPatientsPage /> }
    ],
  },
  {
    path: "/",
    element: <AuthorizedRoute allowedRole={["doctor", "patient"]}><LiveInteractionLayout /></AuthorizedRoute>, 
    children: [
      { path: "consultation/:roomId", element: <ConsultationPage /> },
      {path: 'chat', element: <ChatPage /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
