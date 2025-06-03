import { ISignInResponse } from "../types/authType";
import { login } from "../store/slices/commonSlices/AuthSlice";
import store from "../store/store";
import { api } from "./axiosInstance";




export async function tryRefreshToken() {
    console.log(login,'sfdasdf');
    const { data: response } = await api.post<ISignInResponse>("/api/auth/refresh-token");
  store.dispatch(login(response.data));
  return response.data;
}
