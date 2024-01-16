import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'redux/userSlice';

export const store = configureStore({
  reducer: {
    userSlice
  }
});

export type RootState = ReturnType<typeof store.getState>; // Redux 스토어의 상태에 대한 타입 => state에 대한 타입
export type AppDispatch = typeof store.dispatch; // dispatch 에 대한 타입
