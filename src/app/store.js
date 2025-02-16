import { configureStore } from '@reduxjs/toolkit'
import themeSlice from '../feature/Theme/ThemeSlice';
import { ApiSlice } from '../feature/Api/Api';
import authSlice from '../feature/authSlice';

export const store = configureStore({
  reducer: {
    theme:themeSlice,
    auth:authSlice,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiSlice.middleware),
})

