import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
  id: string;
  email?: string;
  avatar_url?: string;
  nickname?: string | null;
  profile?: string | null;
  genres?: string[];
}

export interface UserState {
  userInfo: UserData | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: UserState = {
  userInfo: null,
  isLoading: false,
  isError: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState['userInfo'] | null>) => {
      state.userInfo = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    }
  }
});

export const { setUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
