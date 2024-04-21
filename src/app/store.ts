import { configureStore } from '@reduxjs/toolkit';

import issuesReducer from '../features/issues/issuesSlice';
import columnsReducer from '../features/columns/columnsSlice';
import repoUrlReducer from '../features/repoUrl/repoUrlSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
    repoUrl: repoUrlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
