import { configureStore } from '@reduxjs/toolkit';

import issuesReducer from '../features/issues/issuesSlice';
import columnsReducer, { clearColumns } from '../features/columns/columnsSlice';
import repoUrlReducer from '../features/repoUrl/repoUrlSlice';
import lastActionReducer from '../features/lastAction/lastActionSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
    repoUrl: repoUrlReducer,
    lastAction: lastActionReducer,
  },
});

store.subscribe(() => {
  const currentState = store.getState();

  if (currentState.lastAction !== clearColumns.type) {
    const savedStateString = localStorage.getItem('columns');
    const savedState = savedStateString ? JSON.parse(savedStateString) : {};

    savedState[currentState.repoUrl.repoUrl] = currentState.columns;
    localStorage.setItem('columns', JSON.stringify(savedState));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
