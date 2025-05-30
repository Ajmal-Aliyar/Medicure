import { useEffect, useState } from "react";
import { api } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/slices/AuthSlice";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get<{
          data: {};
          success: boolean;
          message: string;
        }>("/api/auth/me");
        if (data.success) {
          dispatch(login(data.data));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return loading;
};
