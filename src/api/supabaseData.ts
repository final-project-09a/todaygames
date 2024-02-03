import { supabase } from '../types/supabase';
import { QUERY_KEYS } from 'query/keys';

export type Post = {
  title: string;
  game: string;
  category: string;
  image: string[];
  content: string;
  user_id: string;
  review:string,
  star_rating:string
};

const postContents = async (newPost: Post) => {
  await supabase.from(QUERY_KEYS.POST).insert(newPost);
};

const insertPost = async (newPost: Post) => {
  const { data, error } = await supabase.from(QUERY_KEYS.POST).insert([
    {
      user_id: newPost.user_id,
      title: newPost.title,
      game: newPost.game,
      category: newPost.category,
      image: newPost.image,
      content: newPost.content,
      review:newPost.review,
      star_rating:newPost.star_rating
    }
  ]);
  if (error) {
    console.log('error', error);
    return null;
  }
  return data;
};

export { postContents, insertPost };
