import { DataContext } from 'pages/detail/Detail';
import { useContext } from 'react';

const GameInfo = () => {
  const data = useContext(DataContext);
  const genres = data?.genres.map((genre) => genre.description);
  console.log(data);

  return (
    <>
      <h2>게임정보</h2>
      <p>
        {data && data.about_the_game !== undefined ? (
          <div dangerouslySetInnerHTML={{ __html: data.short_description }} />
        ) : null}
      </p>
      <div>
        <section>
          <label>장르</label>
          <label>개발자</label>
          <label>배급사</label>
          <label>출시일</label>
        </section>
        <section>
          <p>{genres?.join(', ')}</p>
          <p>{data?.developers}</p>
          <p>{data?.publishers}</p>
          <p>{data?.release_date.date}</p>
        </section>
      </div>
    </>
  );
};

export default GameInfo;
