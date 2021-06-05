import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repoLogin: "facebook",
  repoName: "react",
  issuesState: "open",
  search: "",
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setRepoInfo: (state, action) => {
      const { login, name } = action.payload;
      state.repoLogin = login;
      state.repoName = name;
      state.issuesState = "open";
    },
    setIssuesState: (state, action) => {
      state.issuesState = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setRepoInfo, setIssuesState, setSearch } =
  repositorySlice.actions;

export const selectRepoName = (state) => state.repository.repoName;
export const selectRepoLogin = (state) => state.repository.repoLogin;
export const selectState = (state) => state.repository.issuesState;
export const selectSearch = (state) => state.repository.search;

export default repositorySlice.reducer;
