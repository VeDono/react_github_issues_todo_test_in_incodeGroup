import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  todo: number[];
  inProgress: number[];
  done: number[];
}

const initialState: InitialStateType = {
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
  },
});

export const { addIssue } = columnsSlice.actions;

export default columnsSlice.reducer;
