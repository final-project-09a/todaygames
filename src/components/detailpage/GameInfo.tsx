import { DataContext } from 'pages/detail/Detail';
import { useContext } from 'react';

const GameInfo = () => {
  const data = useContext(DataContext);
  const genres = data?.genres.map((genre) => genre.description);

  return (
    <>
      <h2>게임정보</h2>
      {data && data.about_the_game !== undefined ? (
        <div>
          <p dangerouslySetInnerHTML={{ __html: data.short_description }} />
        </div>
      ) : null}
      <div>
        <section>
          <label>장르</label>
          <label>개발자</label>
          <label>배급사</label>
          <label>출시일</label>
        </section>
        <section>
          <h4>{genres?.join(', ')}</h4>
          <h4>{data?.developers?.join(', ')}</h4>
          <h4>{data?.publishers}</h4>
          <h4>{data?.release_date.date}</h4>
        </section>
      </div>
    </>
  );
};

export default GameInfo;
