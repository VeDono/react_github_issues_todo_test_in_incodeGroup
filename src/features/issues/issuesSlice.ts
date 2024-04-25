/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Issue } from '../../types/Issue';

const initialState: Issue[] = [];

export const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Issue[]>) => {
      const [receivedIssue] = action.payload;

      if (state.some((issue) => issue.id === receivedIssue.id)) {
        return;
      }

      state.push(...action.payload);
    },
    wipe: (state) => {
      state.splice(0, state.length);
    },
  },
});

export const { set, wipe } = issuesSlice.actions;

export default issuesSlice.reducer;
