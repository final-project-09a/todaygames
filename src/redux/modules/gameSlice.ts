import { createSlice } from '@reduxjs/toolkit';

export interface GameData {
  release_date: { date: string };
  app_id: number;
  capsule_image: string;
  genres: string[];
  header_image: string;
  id: number;
  is_free: boolean;
  name: string;
  short_description: string;
}

export interface GameState {
  data: GameData[];
  isLoading: boolean;
  isError: boolean;
}

const initialState = {
  data: [],
  isLoading: false,
  isError: false
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    }
  }
});

export const { setGame, setLoading, setError } = gameSlice.actions;
export default gameSlice.reducer;
