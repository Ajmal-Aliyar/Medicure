import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string;
  role: string;
  isAuthenticated: boolean;
  //   status: 'idle' | 'loading' | 'succeeded' | 'failed';
  //   error: string | null;
}



const userSlice = createSlice({
  name: 'auth',
  initialState: {
    email: '',
    role: '',
    isAuthenticated: false,
    // status: 'idle',
    // error: null,
  } as UserState,
  reducers: {
    setData : (state, action: PayloadAction<{ email: string; role: string }>) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuthenticated = false;
    },
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = '';
      state.role = '';
      state.isAuthenticated = false;
    }
  },

});


export const { setData, login, logout } = userSlice.actions;
export default userSlice.reducer;





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