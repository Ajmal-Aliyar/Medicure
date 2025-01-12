import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  role: string;
  isApproved?: boolean;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: '',
  role: '',
  isApproved: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ email: string; role: string; isApproved?: boolean }>) => {
      const { email, role, isApproved } = action.payload;
      state.email = email;
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

export const { setData, login, logout } = userSlice.actions;
export default userSlice.reducer;
