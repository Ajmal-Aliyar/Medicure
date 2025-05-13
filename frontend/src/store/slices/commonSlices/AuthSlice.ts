import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../utils/axiosInstance';

interface AuthState {
  _id: string;
  email: string;
  role: string;
  isApproved?: boolean;
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

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.get('/api/auth/logout');
      return true; 
    } catch (error: unknown) {
      return rejectWithValue('Error occured while logout' );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ _id: string; email: string; role: string; isApproved?: boolean }>) => {
      const { _id, email, role, isApproved } = action.payload;
      state._id = _id;
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
    blockUser: (state) => {
      state.isBlocked = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logOutUser.rejected, (_state, action) => {
        console.error('Logout failed:', action.payload);
      });
  },
});


export const { setData, login, logout, blockUser } = authSlice.actions;
export default authSlice.reducer;
