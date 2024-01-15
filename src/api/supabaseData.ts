import { Post } from 'types/global.d';
import { supabasedata } from '../shared/supabase';
import { QUERY_KEYS } from 'query/keys';

const postContents = async (newPost: Post) => {
  await supabasedata.from(QUERY_KEYS.POST).insert(newPost);
};

const upsertPost = async (newPost: Post) => {
  await supabasedata
    .from(QUERY_KEYS.POST)
    .upsert({
      uid: newPost.user_id,
      id: newPost.id,
      category: newPost.category,
      title: newPost.title,
      image: newPost.image,
      content: newPost.content,
      commentCount: newPost.comments_count,
      likeCount: newPost.like_count
    })
    .select();
};

export { postContents, upsertPost };
