import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repoLogin: "facebook",
  repoName: "react",
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setRepoInfo: (state, action) => {
      const { login, name } = action.payload;
      state.repoLogin = login;
      state.repoName = name;
    },
  },
});

export const { setRepoInfo } = repositorySlice.actions;

export const selectRepoName = (state) => state.repository.repoName;
export const selectRepoLogin = (state) => state.repository.repoLogin;

export default repositorySlice.reducer;
