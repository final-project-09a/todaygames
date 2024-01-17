import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoading: false,
  isError: false
};

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setData: (state, action) => {
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

export const { setData, setLoading, setError } = gameSlice.actions;
export default gameSlice.reducer;
