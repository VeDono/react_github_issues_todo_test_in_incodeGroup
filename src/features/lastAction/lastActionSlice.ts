import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addIssue, moveIssue, clearColumns } from '../columns/columnsSlice';

const lastActionSlice = createSlice({
  name: 'lastAction',
  initialState: 'columns/clearColumns',
  reducers: {
    setLastAction: (state, action: PayloadAction<string>) => action.payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIssue, () => addIssue.type)
      .addCase(moveIssue, () => moveIssue.type)
      .addCase(clearColumns, () => clearColumns.type);
  },
});

export const { setLastAction } = lastActionSlice.actions;

export default lastActionSlice.reducer;
