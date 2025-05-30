import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  _id: string;
  email: string;
  role: string;
  isApproved: boolean;
  isAuthenticated: boolean;
  isBlocked: boolean    
}

const initialState: AuthState = {
  _id: '',
  email: '',
  role: '',
  isApproved: false,
  isAuthenticated: false,
  isBlocked: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ _id: string; email: string; role: string; isApproved: boolean }>) => {
      const { _id, email, role, isApproved } = action.payload;
      state._id = _id;
      state.email = email;
      state.role = role;
      state.isApproved = isApproved;
      state.isAuthenticated = false; 
    },
    login: (state, action) => {
    state.isAuthenticated = true;
    state.role = action.payload.role;
    // state.isLoading = false;
  },
  logout: (state) => {
    state.isAuthenticated = false;
    state.role = '';
    // state.isLoading = false;
  },
    blockUser: (state) => {
      state.isBlocked = true
    }
  },
})

export const { setData, login, logout, blockUser } = authSlice.actions;
export default authSlice.reducer;