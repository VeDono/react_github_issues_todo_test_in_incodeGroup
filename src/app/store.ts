import { configureStore } from '@reduxjs/toolkit';

import issuesReducer from '../features/issues/issuesSlice';
import columnsReducer from '../features/columns/columnsSlice';

export const store = configureStore({
  reducer: {
    issues: issuesReducer,
    columns: columnsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
