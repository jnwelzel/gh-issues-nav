import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticateGitHubUser } from "./authAPI";

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "idle",
};

export const fetchUserAsync = createAsyncThunk(
  "auth/authenticateGitHubUser",
  async ({ proxyUrl, gitHubCode }) => {
    const user = await authenticateGitHubUser({ proxyUrl, gitHubCode });

    return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        const user = action.payload;
        state.status = "idle";
        state.user = user;
        state.isLoggedIn = true;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("user", JSON.stringify(user));
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
