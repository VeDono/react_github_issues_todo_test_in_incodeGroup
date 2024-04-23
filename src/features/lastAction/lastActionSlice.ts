import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addIssue, moveIssue, clearColumns } from '../columns/columnsSlice';

const lastActionSlice = createSlice({
  name: 'lastAction',
  initialState: '',
  reducers: {
    setLastAction: (state, action: PayloadAction<string>) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIssue, () => 'addIssue')
      .addCase(moveIssue, () => 'moveIssue')
      .addCase(clearColumns, () => 'clearColumns');
  },
});

export const { setLastAction } = lastActionSlice.actions;

export default lastActionSlice.reducer;
