import { useQuery } from '@tanstack/react-query';
import { getGameDetails } from 'api/games';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail = () => {
  const { appid } = useParams();
  console.log(appid);
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
        <img src={data.background} alt={data.name} />
      </StImageWrapper>
      <h2>{data.name}</h2>
    </StContainer>
  );
};

export default Detail;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1440px;
  margin: 10px auto;
`;

const StImageWrapper = styled.figure`
  width: 100%;
  height: 300px;
`;
