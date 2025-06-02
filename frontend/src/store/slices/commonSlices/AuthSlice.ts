import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../utils/axiosInstance";
import { AppUser } from "../../../types/common/IAppUser";

interface AuthState {
  _id: string;
  email: string;
  role: string;
  fullName: string | null;
  profileImage: string | null;
  isApproved: null | "pending" | "applied" | "approved" | "rejected";
  isAuthenticated: boolean;
  isBlocked: boolean;
}

const initialState: AuthState = {
  _id: "",
  email: "",
  role: "",
  isApproved: null,
  fullName: null,
  profileImage: null,
  isAuthenticated: false,
  isBlocked: false,
};

export const logOutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/api/auth/logout");
      return true;
    } catch (error: unknown) {
      return rejectWithValue("Error occured while logout");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<{ id: string, email: string, role: string, isApproved: null | "pending" | "applied" | "approved" | "rejected" }>) => {
      const { id, email, role, isApproved } = action.payload;
      state._id = id;
      state.email = email;
      state.role = role;
      state.isApproved = isApproved;
      state.isAuthenticated = false;
    },
    login: (state, action: PayloadAction<AppUser>) => {
      const { id, email, role, isApproved, fullName, profileImage } = action.payload;
      console.log(action.payload, 'datas');
      
      state._id = id;
      state.email = email;
      state.role = role;
      state.fullName = fullName;
      state.profileImage = profileImage;
      state.isApproved = isApproved;
      state.isAuthenticated = true;
      // state.isLoading = false;
    },
    blockUser: (state) => {
      state.isBlocked = true;
    },
    handleApprove: (
      state,
      action: PayloadAction<{
        status: "pending" | "applied" | "approved" | "rejected";
      }>
    ) => {
      console.log(action.payload.status);

      state.isApproved = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logOutUser.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logOutUser.rejected, (_state, action) => {
        console.error("Logout failed:", action.payload);
      });
  },
});

export const { setData, login, blockUser, handleApprove } = authSlice.actions;
export default authSlice.reducer;
