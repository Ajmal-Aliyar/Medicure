
import { authService } from "@/services/api/public/auth";
import { loginSuccess, logout } from "@/slices/authSlice";
import socket from "@/sockets";
import { registerConsultationHandlers } from "@/sockets/handlers/consultation-handler";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useAuthCheck = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)
            try {
                const { data, success } = await authService.me()
                if (success) {
                    dispatch(loginSuccess({ user: data }));
                    socket.on("connect", () => {
                        console.log("Connected to socket:", socket.id);
                    });

                    socket.on("connect_error", (err) => {
                        console.error("Socket connection error:", err);
                    });

                    socket.connect()
                    registerConsultationHandlers()
                } else {
                    dispatch(logout())
                }
            } catch {
                dispatch(logout())
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [dispatch]);

    return loading;
};
