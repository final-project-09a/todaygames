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
        {/* <h3>{data.about_the_game}</h3> */}
        <p dangerouslySetInnerHTML={{ __html: data.detailed_description }} />
        {/* <p>{data.detailed_description}</p> */}
      </div>
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
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
