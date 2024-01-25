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

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
