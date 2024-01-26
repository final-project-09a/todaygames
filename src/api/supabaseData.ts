import { Post } from 'types/global.d';
import { supabase } from '../types/supabase';
import { QUERY_KEYS } from 'query/keys';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';

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
      content: newPost.content
    }
  ]);
  if (error) {
    console.log('error', error);
    return null;
  }
  return data;
};

export { postContents, insertPost };
