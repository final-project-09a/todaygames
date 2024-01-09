import { supabasedata } from 'shared/supabase';
import { Typedata } from 'shared/supabase.type';
interface postType {
  data: Typedata;
  error: string;
  id: string;
}
export const ListCumm = () => {
  const data = supabasedata.from('posts').select('*').returns<Typedata['public']['Tables']['comments']['Row']>();

  return (
    <>
      {/* 최신순카테고리 */}
      {/* 장르 */}
      <>
        {/* 선택한 카테고리 text */}
        {/* 제목 */}
        {/* {content} */}
      </>
      {/* 댓글수 */}
      {/* 좋아요 수 */}
      <div>Board</div>
    </>
  );
};
