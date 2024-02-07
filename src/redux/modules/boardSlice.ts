import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Typedata } from 'types/supabaseTable';

export type SortOption = "최근순" | "인기순";

type PostType = Typedata[ 'public' ][ 'Tables' ][ 'posts' ][ 'Row' ];

interface BoardState
{
  filteredPosts: PostType[];
  selectedGenres: string[];
  sortOption: SortOption
}

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    filteredPosts: [],
    selectedGenres: [],
    sortOption: '최근순'
  } as BoardState,
  reducers: {
    setFilteredPosts: ( state, action: PayloadAction<PostType[]> ) =>
    {
      state.filteredPosts = action.payload;
    },
    setSelectedGenres: (state, action: PayloadAction<string[]>) => {
      state.selectedGenres = action.payload;
    },
    setSortOption: ( state, action: PayloadAction<SortOption> ) =>
    {
      state.sortOption = action.payload
    }
  }
});

export const { setFilteredPosts, setSelectedGenres, setSortOption } = boardSlice.actions;
export default boardSlice.reducer;