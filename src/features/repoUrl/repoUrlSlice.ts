import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearColumns } from '../columns/columnsSlice';

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
  async (url: string, { dispatch }) => {
    dispatch(set(url));
    dispatch(clearColumns());
  },
);

export default repoUrlSlice.reducer;
