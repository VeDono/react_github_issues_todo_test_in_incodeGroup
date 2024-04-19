import { createSlice } from '@reduxjs/toolkit';

import { Issue } from '../../types/Issue';

const initialState: Issue[] = [];

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    set: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { set } = issuesSlice.actions;

export default issuesSlice.reducer;
