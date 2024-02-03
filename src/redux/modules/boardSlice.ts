import { createSlice } from '@reduxjs/toolkit';

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    filteredPosts: [],
    selectedGenres: [] as string[]
  },
  reducers: {
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    }
  }
});

export const { setFilteredPosts, setSelectedGenres } = boardSlice.actions;
export default boardSlice.reducer;
