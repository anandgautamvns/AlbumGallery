import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import logger from 'redux-logger';
import {reducers} from './rootReducer';

const isDev = __DEV__; // React Native global for development mode

export const store = configureStore({
  reducer: reducers,
  devTools: isDev,
  middleware: getDefaultMiddleware =>
    process.env.NODE_ENV === 'development' || isDev
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
});

// ----- Types -----
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;
