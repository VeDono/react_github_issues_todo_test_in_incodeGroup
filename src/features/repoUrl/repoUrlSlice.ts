import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearColumns } from '../columns/columnsSlice';
import { RootState } from '../../app/store';

interface InitialStateType {
  repoUrl: string;
}

const initialState: InitialStateType = {
  repoUrl: '',
};

export const repoUrlSlice = createSlice({
  name: 'repoUrl',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.repoUrl = action.payload;
      localStorage.setItem(`repoUrl`, state.repoUrl);
    },
  },
});

export const { set } = repoUrlSlice.actions;

export const setRepoUrlAndClearColumns = createAsyncThunk(
  'repoUrl/setAndClearColumns',
  async (url: string, { dispatch, getState }) => {
    const state = getState() as RootState;
    const savedStateString = localStorage.getItem('columns');
    const savedState = savedStateString ? JSON.parse(savedStateString) : {};

    savedState[state.repoUrl.repoUrl] = state.columns;
    localStorage.setItem('columns', JSON.stringify(savedState));

    dispatch(clearColumns());
    dispatch(set(url));
  },
);

export default repoUrlSlice.reducer;
