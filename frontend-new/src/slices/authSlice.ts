import type { AuthUser } from '@/types/auth';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  user: AuthUser | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthChecked: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: AuthUser }>
    ) => {
      state.isAuthenticated = true;
      state.isAuthChecked = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAuthChecked = true;
      state.user = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    handleApprove: (
      state,
      action: PayloadAction<{
        status: "pending" | "applied" | "approved" | "rejected";
      }>
    ) => {
      if(state.user) {
        state.user.isApproved = action.payload.status;
      } 
    },
  },
});

export const { loginSuccess, logout, updateUserProfile, handleApprove } = authSlice.actions;
export default authSlice.reducer;
