import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import { useParams } from 'react-router-dom';
import { StContainer, StImageWrapper } from './styles';

const Detail = () => {
  const { appid } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['gameDetailInfo', appid],
    queryFn: () => getGameDetails(appid)
  });

  if (isLoading) {
    return <div>게임 정보 로딩중...</div>;
  }

  if (isError) {
    return <div>게임 정보를 가져올 수 없습니다.</div>;
  }

  return (
    <StContainer>
      <StImageWrapper>
        <img src={data.background_raw} alt={data.name} />
      </StImageWrapper>
      <h2>{data.name}</h2>
      <div>
        <label>출시일</label>
        <h2>{data.release_date.date}</h2>
      </div>
      <div>
        <label>장르</label>
        <h2>{data.genres.map((genre: any) => genre.description).join(' / ')}</h2>
      </div>
      <div>
        <label>게임정보</label>
        <p dangerouslySetInnerHTML={{ __html: data.about_the_game }} />
        <p dangerouslySetInnerHTML={{ __html: data.short_description }} />
      </div>
    </StContainer>
  );
};

export default Detail;
