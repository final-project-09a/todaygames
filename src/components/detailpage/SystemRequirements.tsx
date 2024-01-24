import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/games';

type SystemRequirementsProps = {
  appid: string | undefined;
};

export interface GameData {
  name: string;
  header_image: string;
  app_id: number;
  pcRequirements: {
    DirectX: string;
    etc: string;
    graphics: string;
    memory: string;
    network: string;
    os: string;
    processor: string;
    sound: string;
    storage: string;
  };
  genres: string;
}

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
    return null;
  }

  const { pcRequirements } = game;

  return (
    <>
      <h2>시스템 요구사항</h2>
      {}
      <p>{pcRequirements?.minimum}</p>
      <div>
        <section>
          <label>{pcRequirements?.os && '운영체제'}</label>
          <label>{pcRequirements?.processor && '프로세서'}</label>
          <label>{pcRequirements?.memory && '메모리'}</label>
          <label>{pcRequirements?.graphics && '그래픽'}</label>
          <label>{pcRequirements?.sound && '사운드카드'}</label>
          <label>{pcRequirements?.DirectX && 'DirectX'}</label>
          <label>{pcRequirements?.storage && '저장공간'}</label>
        </section>
        <section>
          <h4>{pcRequirements?.os && pcRequirements?.os}</h4>
          <h4>{pcRequirements?.processor && pcRequirements?.processor}</h4>
          <h4>{pcRequirements?.memory && pcRequirements?.memory}</h4>
          <h4>{pcRequirements?.graphics && pcRequirements?.graphics}</h4>
          <h4>{pcRequirements?.sound && pcRequirements?.sound}</h4>
          <h4>{pcRequirements?.DirectX && pcRequirements?.DirectX}</h4>
          <h4>{pcRequirements?.storage && pcRequirements?.storage}</h4>
        </section>
      </div>
      <p>{pcRequirements?.etc}</p>
    </>
  );
};

export default SystemRequirements;
