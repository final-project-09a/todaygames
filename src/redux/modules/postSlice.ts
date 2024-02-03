import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Typedata } from 'types/supabaseTable';

interface PostState {
  updatePost: any;
  deletePost: any;
  posts: Typedata['public']['Tables']['posts']['Row'][];
}

const initialState: PostState = {
  updatePost: [],
  deletePost: [],
  posts: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Typedata['public']['Tables']['posts']['Row']>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Typedata['public']['Tables']['posts']['Row']>) => {
      const { id } = action.payload;
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === id) {
            return { ...post, ...action.payload };
          }
          return post;
        })
      };
    },
    deletePost: (state, action: PayloadAction<Typedata['public']['Tables']['posts']['Row']>) => {
      const postIdToDelete = action.payload.id;
      const newState = {
        ...state,
        posts: state.posts.filter((post) => post.id !== postIdToDelete)
      };
      return newState;
    }
  }
});

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
