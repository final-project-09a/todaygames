import { Post } from 'types/global.d';
import { supabase } from '../shared/supabase';
import { QUERY_KEYS } from 'query/keys';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';

const postContents = async (newPost: Post) => {
  await supabase.from(QUERY_KEYS.POST).insert(newPost);
};

const user = useSelector((state: RootState) => state.userSlice.userInfo);

const [imageFiles, setImageFiles] = useState<File[]>([]);
// 이미지를 Supabase 스토리지에 업로드하는 함수
const postImagesToStorage = async () => {
  const uploadedImageUrls: string[] = [];
  try {
    for (const file of imageFiles) {
      // 공백 제거 및 특수 문자 대체
      const safeUserName = user?.nickname?.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '_');
      // 파일 이름을 안전한 형태로 변환
      const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const filePath = `${safeUserName}/${safeFileName}`;

      const { error, data } = await supabase.storage.from('postImage').upload(filePath, file);
      if (error) throw error;
      const { data: publicURL } = supabase.storage.from('postImage').getPublicUrl(filePath);
      uploadedImageUrls.push(publicURL.publicUrl);
    }
  } catch (error) {
    console.error('Error uploading image: ', error);
  }
  return uploadedImageUrls;
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

export { postContents, insertPost, postImagesToStorage };
