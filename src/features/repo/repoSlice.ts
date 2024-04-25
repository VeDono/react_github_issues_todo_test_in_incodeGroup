/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearColumns } from '../columns/columnsSlice';
import { wipe as wipeIssues } from '../issues/issuesSlice';
import { RepoData } from '../../types/RepoData';
// import { RootState } from '../../app/store';

interface InitialStateType {
  repoUrl: string;
  repoData: RepoData;
}

const initialState: InitialStateType = {
  repoUrl: '',
  repoData: {
    name: '',
    html_url: '',
    owner: {
      login: '',
      html_url: '',
    },
    stargazers_count: null,
  },
};

export const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setRepoUrl: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.repoUrl = action.payload;
      localStorage.setItem(`repoUrl`, state.repoUrl);
    },
    setRepoData: (state, action: PayloadAction<RepoData>) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { name, html_url, owner, stargazers_count } = action.payload;
      const filteredOwner = { login: owner.login, html_url: owner.html_url };

      state.repoData.name = name;
      state.repoData.html_url = html_url;
      state.repoData.owner = filteredOwner;
      state.repoData.stargazers_count = stargazers_count;
    },
  },
});

export const { setRepoUrl, setRepoData } = repoSlice.actions;

export const setRepoUrlAndClearColumns = createAsyncThunk(
  'repo/setAndClearColumns',
  async (url: string, { dispatch }) => {
    dispatch(clearColumns());
    dispatch(wipeIssues());
    dispatch(setRepoUrl(url));
  },
);

export default repoSlice.reducer;
