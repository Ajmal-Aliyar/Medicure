import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  _id?: string;
  email: string;
  role: string;
  isApproved?: boolean;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  _id: '',
  email: '',
  role: '',
  isApproved: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ _id?: string; email: string, role: string; isApproved?: boolean }>) => {
      const { _id, email, role, isApproved } = action.payload;
      state._id = _id;
      state.email = email
      state.role = role;
      state.isApproved = isApproved;
      state.isAuthenticated = false;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setData, login, logout } = authSlice.actions;
export default authSlice.reducer;
