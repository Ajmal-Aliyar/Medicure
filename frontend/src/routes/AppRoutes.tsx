// // src/routes/AppRoutes.tsx
// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import AuthorizedRoute from './AuthorizedRoute';
// import RoleBasedRoute from './RoleBasedRoute';
// import Dashboard from '../pages/Dashboard';
// import LoginPage from '../pages/LoginPage';
// import AdminPage from '../pages/AdminPage';
// import NotFound from '../pages/NotFound';

// const AppRoutes: React.FC = () => {
//     const { isAuthenticated, userRole } = useAuth();

//     return (
//         <Routes>
//             {/* Public Route */}
//             <Route path="/login" element={<LoginPage />} />

//             {/* Protected Route */}
//             <Route
//                 path="/dashboard"
//                 element={
//                     <AuthorizedRoute isAuthenticated={isAuthenticated}>
//                         <Dashboard />
//                     </AuthorizedRoute>
//                 }
//             />

//             {/* Role-Based Route */}
//             <Route
//                 path="/admin"
//                 element={
//                     <RoleBasedRoute
//                         isAuthenticated={isAuthenticated}
//                         allowedRoles={['admin']}
//                         userRole={userRole}
//                     >
//                         <AdminPage />
//                     </RoleBasedRoute>
//                 }
//             />

//             {/* Catch-all for 404 */}
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// };

// export default AppRoutes;
