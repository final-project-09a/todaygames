// 게시판 상세정보  디자인 미정

// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { getPosts } from 'api/post';
import { Typedata } from 'shared/supabase.type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getGames } from 'api/games';
interface PostType {
  data: Typedata['public']['Tables']['posts']['Row'];
}
interface UserInfos {
  userInfo: Typedata['public']['Tables']['userinfo']['Row'];
}
interface Games {
  getGames: Typedata['public']['Tables']['games']['Row'];
}
export const Main = () => {
  const navigate = useNavigate();

  const { isLoading: postsLoading, data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });
  const { isLoading: userInfoLoading, data: userInfoData = [] } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  const {
    isLoading,
    isError,
    data: getgamesData = []
  } = useQuery({
    queryKey: [QUERY_KEYS.GAMES],
    queryFn: getGames
  });
  if (isLoading) {
    return <p>로딩 중...</p>;
  } else if (isError) {
    throw new Error();
  } else if (getgamesData) {
    console.log('game name: ', getgamesData);
  }

  //  글쓰기로 이동
  const moveregisterPageOnClick = (item: string) => {
    if (item) navigate(`/Register/${item}`);
  };
  const movedetailPageOnClick = (item: string, event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/boarddetail/${item}`);
  };

  return (
    <>
      <Stselectcontainer>
        <StyledBox>
          <option>최신순</option>
          <option>인기순</option>
        </StyledBox>
        <StBox>
          <option>RPG</option>
          <option>액션</option>
          <option>어드벤처</option>
          <option>전략</option>
          <option>레이싱 시뮬레이션</option>
        </StBox>
        <StSeachandButton>
          <Stseach />
          <Stbutton onClick={() => moveregisterPageOnClick}>글쓰기</Stbutton>
        </StSeachandButton>
      </Stselectcontainer>
      {userInfoData.map((data) => (
        <StcontentBox key={data.id} onClick={(event) => movedetailPageOnClick(data.id, event)}>
          <UserImage src={data.avatar_url} alt="프로필 이미지" />
          <Username>{data.username}</Username>
          {/* {getGames.map((game: any) => (
            <GameComponent key={game.id}></GameComponent>
          ))} */}
        </StcontentBox>
      ))}
    </>
  );
};
export const GameComponent = styled.div`
  display: flex;
`;
export const Username = styled.h3`
  font-size: ${(props) => props.theme.fontSize.xxxl};
  color: ${(props) => props.theme.color.white};
`;

const Stselectcontainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledBox = styled.select`
  height: 42px;
  width: 101px;
  margin-right: 10px;
  background-color: #232323;
  color: #ffffff;
  border-radius: 50px;
  line-height: normal;
`;

const StBox = styled.select`
  background-color: #232323;
  border-radius: 50px;
  height: 42px;
  width: 89px;
  line-height: normal;
  margin-right: 140px;
  color: #ffffff;
`;
const StSeachandButton = styled.form`
  display: flex;
`;

const Stseach = styled.input`
  height: 48px;
  width: 438px;
  background-color: #232323;
  border-radius: 10px;
  color: white;
`;

const Stbutton = styled.button`
  height: 48px;
  width: 80px;
  background-color: #2d4ea5;
  border-radius: 10px;
`;

const StcontentBox = styled.div`
  display: flex;
  height: 283px;
  width: 1281px;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: #232323;
  border-radius: 10px;
  margin-top: 30px;
`;

const UserImage = styled.img`
  width: 100px; // 이미지의 크기를 조절하거나 다른 스타일을 적용할 수 있습니다.
  height: 100px;
  object-fit: cover; // 이미지가 컨테이너에 꽉 차도록 설정합니다.
`;

// 메인게시판 image 부분 그리기
// post 데이터 가져오기
// userid 가져와서 프로필뿌리기

// post

//  1. 문제 : 두 쿼리를 하나의 map에 사용하기
// 두 쿼리의 id값이 일치할 경우 화면에 뿌려짐 로직
// 게시판리스트를 만드는 것이기때문에 storage에서 이미지도 추출해야함
// 해당 유저   </StcontentBox> 클릭시 해당 게시판의 상세게시판 창으로 이동
