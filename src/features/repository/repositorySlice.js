import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repoLogin: "facebook",
  repoName: "react",
  issuesState: "OPEN",
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setRepoInfo: (state, action) => {
      const { login, name } = action.payload;
      state.repoLogin = login;
      state.repoName = name;
      state.issuesState = "OPEN";
    },
    setIssuesState: (state, action) => {
      state.issuesState = action.payload;
    },
  },
});

export const { setRepoInfo, setIssuesState } = repositorySlice.actions;

export const selectRepoName = (state) => state.repository.repoName;
export const selectRepoLogin = (state) => state.repository.repoLogin;
export const selectState = (state) => state.repository.issuesState;

export default repositorySlice.reducer;
