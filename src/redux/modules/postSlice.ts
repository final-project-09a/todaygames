import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: string;
  user_id: string;
  content: string;
  image: string;
  title: string;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const { id } = action.payload;
      const post = state.posts.find((post) => post.id === id);
      if (post) {
        Object.assign(post, action.payload);
      }
    },
    deletePost: (state, action: PayloadAction<Post>) => {
      const postIdToDelete = action.payload.id;
      const newState = {
        ...state,
        posts: state.posts.filter((post) => post.id !== postIdToDelete)
      };
      return newState;
    }
  }
});

export const { addPost, updatePost } = postSlice.actions;
export default postSlice.reducer;
