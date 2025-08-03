import { useLocation } from "react-router-dom";

export const useRole = (): "patient" | "doctor" | "admin" => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/doctor")) return "doctor";
  if (pathname.startsWith("/user")) return "patient";
  if (pathname.startsWith("/admin")) return "admin";
  return "patient";
};
