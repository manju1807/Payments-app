'use client';
// Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers
import PaymentSlice from './payments/index';

export const store = configureStore({
  reducer: { Payment: PaymentSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
