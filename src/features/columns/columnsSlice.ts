import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ColumnsInitialStateType } from '../../types/ColumnsInitialStateType';

const savedRepoUrl = localStorage.getItem('repoUrl') || '';
const savedState = localStorage.getItem(`columns_${savedRepoUrl}`);
const initialState: ColumnsInitialStateType = savedState
  ? JSON.parse(savedState)
  : { todo: [], inProgress: [], done: [] };

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<number>) => {
      const receivedIssueId = action.payload;

      const hasDuplicates = (
        Object.keys(state) as Array<keyof ColumnsInitialStateType>
      ).some((column) =>
        state[column].some((issueId: number) => issueId === receivedIssueId),
      );

      if (hasDuplicates) {
        return;
      }

      state.todo.push(receivedIssueId);
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
    clearColumns: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.todo = [];
      // eslint-disable-next-line no-param-reassign
      state.inProgress = [];
      // eslint-disable-next-line no-param-reassign
      state.done = [];
    },
  },
});

export const { addIssue, moveIssue, clearColumns } = columnsSlice.actions;

export default columnsSlice.reducer;
