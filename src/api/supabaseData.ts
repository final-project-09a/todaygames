import { Post } from 'types/global.d';
import { supabase } from '../shared/supabase';
import { QUERY_KEYS } from 'query/keys';

const postContents = async (newPost: Post) => {
  await supabase.from(QUERY_KEYS.POST).insert(newPost);
};

const upsertPost = async (newPost: Post) => {
  await supabase
    .from(QUERY_KEYS.POST)
    .upsert({
      id: newPost.id,
      category: newPost.category,
      title: newPost.title,
      image: newPost.image,
      content: newPost.content,
      commentCount: newPost.comments_count,
      likeCount: newPost.like_count,
      uid: newPost.users_id
    })
    .select();
};

export { postContents, upsertPost };
