import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repositoryName: null,
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setRepository: (state, action) => {
      state.repositoryName = action.payload;
    },
  },
});

export const { setRepository } = repositorySlice.actions;

export const selectRepository = (state) => state.repository.repositoryName;

export default repositorySlice.reducer;
