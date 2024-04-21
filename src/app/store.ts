import { configureStore, Middleware } from '@reduxjs/toolkit';

import issuesReducer from '../features/issues/issuesSlice';
import columnsReducer from '../features/columns/columnsSlice';
import repoUrlReducer from '../features/repoUrl/repoUrlSlice';

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  localStorage.setItem(
    `columns_${state.repoUrl.repoUrl}`,
    JSON.stringify(state.columns),
  );

  return result;
};

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
    repoUrl: repoUrlReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
