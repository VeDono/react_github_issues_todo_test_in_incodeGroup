import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ColumnsInitialStateType } from '../../types/ColumnsInitialStateType';

const initialState: ColumnsInitialStateType = {
  todo: [],
  inProgress: [],
  done: [],
};

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<number>) => {
      state.todo.push(action.payload);
    },
    moveIssue: (
      state,
      action: PayloadAction<{
        issueId: number;
        from: keyof ColumnsInitialStateType;
        to: keyof ColumnsInitialStateType;
        indexInDestinationColumn: number;
      }>,
    ) => {
      const { issueId, from, to, indexInDestinationColumn } = action.payload;
      const index = state[from].findIndex((idOfIssue) => idOfIssue === issueId);

      if (index !== -1) {
        const [draggableIssue] = state[from].splice(index, 1);

        state[to].splice(indexInDestinationColumn, 0, draggableIssue);
      }
    },
  },
});

export const { addIssue, moveIssue } = columnsSlice.actions;

export default columnsSlice.reducer;
