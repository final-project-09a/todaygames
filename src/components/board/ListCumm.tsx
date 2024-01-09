import { supabasedata } from 'shared/supabase';

export const ListCumm = () => {
  const { data, error } = supabasedata.from('comments').select('id');
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
