import { useEffect } from 'react';
import { supabasedata } from 'shared/supabase';
import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';

export const BoardRegister = () => {
  useEffect(() => {
    const postsRegister = supabasedata.from('post').select(`
    id,
    user_id,
    category,
    title,
      image,
      content,
      likes_count,
      comments_count,
  `);
    type tppostsRegister = QueryData<typeof BoardRegister>;
    const { data, error } = await postsRegister;
    if (error) throw error;
    const BoardRegister: tppostsRegister = data;
  });
  return (
    <>
      <main>
        <form>
          <div>
            <h3>title</h3>
            <select>
              <option>RPG</option>
              <option>액션</option>
              <option>전략</option>
              <option>캐주얼</option>
              <option>공포</option>
              <option>스포츠</option>
            </select>
            <input />
          </div>
          <h3>content</h3>
          <textarea />
        </form>
      </main>
    </>
  );
};

export default BoardRegister;
