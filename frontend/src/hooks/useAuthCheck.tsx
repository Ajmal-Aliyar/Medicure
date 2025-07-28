import { useEffect, useState } from "react";
import { api } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { login, logOutUser, setData } from "../store/slices/commonSlices/AuthSlice";
import { AppUser } from "../types/common/IAppUser";

export const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get<{
          data: AppUser;
          success: boolean;
          message: string;
        }>("/api/auth/me");
        if (data.success) {
        dispatch(setData(data.data));
          dispatch(login(data.data));
        } else {
          logOutUser()
        }
      } catch {
        logOutUser()
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return loading;
};
