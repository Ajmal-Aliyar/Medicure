import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface User {
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
}



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    // status: 'idle',
    // error: null,
  } as AuthState,
  reducers: {
    setUserData: (
      state,
      action: PayloadAction<{ user: User; token: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  
});


export const { setUserData, clearUserData } = authSlice.actions;
export default authSlice.reducer;





// extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isAuthenticated = true;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Login failed';
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.status = 'idle';
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//       });
//   },