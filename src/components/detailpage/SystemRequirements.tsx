import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';

type SystemRequirementsProps = {
  appid: number;
};

const SystemRequirements = ({ appid }: SystemRequirementsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['systemRequirements'],
    queryFn: getGames
  });

  if (isLoading) {
    return <p>게임 정보를 로딩중입니다...</p>;
  }

  if (isError) {
    return <p>게임 정보를 불러오지 못했습니다.</p>;
  }

  const game = data?.find((game) => game.app_id == appid);

  if (!game || !game.pcRequirements) {
    return (
      <>
        <h2>시스템 요구사항</h2>
        <p>등록된 시스템 요구사항 정보가 없습니다.</p>
      </>
    );
  }

  const { pcRequirements } = game;
  console.log(pcRequirements);
  return (
    <>
      <h2>시스템 요구사항</h2>
      <p>{pcRequirements?.minimum}</p>
      <div>
        <section>
          <label>운영체제</label>
          <label>프로세서</label>
          <label>메모리</label>
          <label>그래픽</label>
          <label>사운드카드</label>
          <label>DirectX</label>
          <label>저장공간</label>
        </section>
        <section>
          <h4>{pcRequirements?.os || '-'}</h4>
          <h4>{pcRequirements?.processor || '-'}</h4>
          <h4>{pcRequirements?.memory || '-'}</h4>
          <h4>{pcRequirements?.graphics || '-'}</h4>
          <h4>{pcRequirements?.sound || '-'}</h4>
          <h4>{pcRequirements?.DirectX || '-'}</h4>
          <h4>{pcRequirements?.storage || '-'}</h4>
        </section>
      </div>
      <p>{pcRequirements?.etc}</p>
    </>
  );
};

export default SystemRequirements;
