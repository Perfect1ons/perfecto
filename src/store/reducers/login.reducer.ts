"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface AuthState {
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "login",
  initialState: initialAuthState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
