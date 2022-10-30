import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './api/todosSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [todosSlice.reducerPath]: todosSlice.reducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosSlice.middleware)
});

setupListeners(store.dispatch);
