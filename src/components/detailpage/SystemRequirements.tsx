import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';

type SystemRequirementsProps = {
  appid: string | undefined;
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

  const requirements = data?.find((game) => game.app_id == appid).pcRequirements;
  console.log(requirements);

  return (
    <>
      <h2>시스템 요구사항</h2>
      <p>{requirements?.minimum}</p>
      <div>
        <section>
          <label>{requirements?.os && '운영체제'}</label>
          <label>{requirements?.processor && '프로세서'}</label>
          <label>{requirements?.memory && '메모리'}</label>
          <label>{requirements?.graphics && '그래픽'}</label>
          <label>{requirements?.sound && '사운드카드'}</label>
          <label>{requirements?.DirectX && 'DirectX'}</label>
          <label>{requirements?.storage && '저장공간'}</label>
        </section>
        <section>
          <h4>{requirements?.os && requirements?.os}</h4>
          <h4>{requirements?.processor && requirements?.processor}</h4>
          <h4>{requirements?.memory && requirements?.memory}</h4>
          <h4>{requirements?.graphics && requirements?.graphics}</h4>
          <h4>{requirements?.sound && requirements?.sound}</h4>
          <h4>{requirements?.DirectX && requirements?.DirectX}</h4>
          <h4>{requirements?.storage && requirements?.storage}</h4>
        </section>
      </div>
      <p>{requirements?.etc}</p>
    </>
  );
};

export default SystemRequirements;
