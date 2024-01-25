import React, { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getGameDetails } from 'api/steamApis';
import RecommendCard from './RecommendCard';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GameType } from 'types/games';
import RecommendCardSkeleton from 'components/skeletons/RecommendCardSkeleton';

interface NewGamesProps {
  mostPlayedGames: GameType[];
}

const RecommendList = ({ mostPlayedGames }: NewGamesProps) => {
  const navigate = useNavigate();

  // // 가장 많이 플레이된 게임 100개 중 top 10만 가져오기
  const topTen = mostPlayedGames?.slice(0, 10);
  const appids = topTen?.map((game: GameType) => game.appid) || [];

  // top 10 상세 정보 가져오기
  const gameDetailsQueries = useQueries({
    queries: appids.map((appid: number) => ({
      queryKey: ['gameDetails', appid],
      queryFn: () => getGameDetails(appid)
      // enabled: appid !== undefined
      // staleTime: Infinity
    }))
  });

  return (
    <StListContainer>
      {gameDetailsQueries.map((query, index) => (
        <li key={appids[index]}>
          {query.isLoading ? (
            <RecommendCardSkeleton />
          ) : (
            <RecommendCard
              onClick={() => navigate(`/detail/${appids[index]}`)}
              $imageUrl={query.data?.header_image}
              alt={query.data?.name}
            >
              <h3>{query.data?.name}</h3>
            </RecommendCard>
          )}
        </li>
      ))}
    </StListContainer>
  );
};

export default RecommendList;

const StListContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  height: 420px;
  width: 100%;
`;
