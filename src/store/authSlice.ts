import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.login("John", "email@example.com");

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.status);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout();

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.status);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = action.payload as any;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = action.payload as any;
      });
  },
});

export default authSlice.reducer;
