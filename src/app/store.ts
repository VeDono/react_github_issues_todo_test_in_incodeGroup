import { configureStore } from '@reduxjs/toolkit';

import issuesReducer from '../features/issues/issuesSlice';
import columnsReducer, {
  addIssue,
  moveIssue,
} from '../features/columns/columnsSlice';
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

  if (
    currentState.lastAction === addIssue.type ||
    currentState.lastAction === moveIssue.type
  ) {
    const savedStateString = localStorage.getItem('columns');
    const savedState = savedStateString ? JSON.parse(savedStateString) : {};

    // eslint-disable-next-line no-console
    console.log(
      // eslint-disable-next-line max-len
      `subscribe: todo:${currentState.columns.todo}, inProgress:${currentState.columns.inProgress}, done:${currentState.columns.done}, ${currentState.repoUrl.repoUrl}`,
    );

    savedState[currentState.repoUrl.repoUrl] = currentState.columns;

    localStorage.setItem('columns', JSON.stringify(savedState));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
