import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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

export default repoUrlSlice.reducer;
