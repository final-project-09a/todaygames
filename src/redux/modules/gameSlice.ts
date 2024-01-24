import { createSlice } from '@reduxjs/toolkit';
import { GameType } from 'types/games';

export interface GameState {
  data: GameType[];
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
