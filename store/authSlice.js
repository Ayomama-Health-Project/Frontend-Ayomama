import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  accessToken: null,
  refreshToken: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      state.account = action.payload.account;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.initialized = true;
    },
    updateAccount(state, action) {
      state.account = action.payload;
      state.initialized = true;
    },
    hydrateTokens(state, action) {
      state.accessToken = action.payload.accessToken || null;
      state.refreshToken = action.payload.refreshToken || null;
      state.initialized = true;
    },
    clearSession(state) {
      state.account = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.initialized = true;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
  },
});

export const { setSession, updateAccount, hydrateTokens, clearSession, setInitialized } =
  authSlice.actions;

export default authSlice.reducer;
