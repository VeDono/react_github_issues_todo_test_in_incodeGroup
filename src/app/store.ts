import { configureStore } from '@reduxjs/toolkit';

import issuesReducer from '../features/issues/issuesSlice';
import columnsReducer, {
  addIssue,
  moveIssue,
} from '../features/columns/columnsSlice';
import repoReducer from '../features/repo/repoSlice';
import lastActionReducer from '../features/lastAction/lastActionSlice';
import loadingReducer from '../features/loading/loadingSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
    repo: repoReducer,
    lastAction: lastActionReducer,
    loading: loadingReducer,
  },
});

store.subscribe(() => {
  const currentState = store.getState();

  if (
    currentState.lastAction === addIssue.type ||
    currentState.lastAction === moveIssue.type
  ) {
    const savedStateString = localStorage.getItem('columns');
    const savedState = savedStateString ? JSON.parse(savedStateString) : {};

    savedState[currentState.repo.repoUrl] = currentState.columns;

    localStorage.setItem('columns', JSON.stringify(savedState));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
