// 게시판 상세정보  디자인 미정

// import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { getPosts } from 'api/post';
import { Typedata } from 'shared/supabase.type';
import userimg from 'assets/img/userimg.png'; // 우선 이 이미지를  StcontentBox안에 넣음
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import { supabasedata } from 'shared/supabase';
import { Avatar } from 'pages/mypage/styles';
interface UserInfotype {
  id: string;
}
interface PostWithUserInfo extends Typedata {
  userInfo: string | undefined; // 사용자 정보가 없을 수도 있음
}
export const Main = () => {
  const navigate = useNavigate();
  const [postlist, setpostList] = useState([]); // 화면에 뿌려질 리스트 state
  const [currentUserid, setCurrentUserId] = React.useState<string>('');
  // post
  const { isLoading: postsLoading, data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });
  const { isLoading: userInfoLoading, data: userInfoData = [] } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });
  // const user = useSelector((state: RootState) => state.user.id);
  if (postsLoading && userInfoLoading) {
    return <p>로딩 중 </p>;
  } else {
    console.log('데이터 정보 확인');
  }
  const userinitialState = {
    Avatar
  };

  //
  // 두 쿼리의 id값이 일치할 경우 화면에 뿌려짐 로직
  // 게시판리스트를 만드는 것이기때문에 storage에서 이미지도 추출해야함
  // 해당 유저  상세게시판 창으로 이동
  //

  const movedetailPageOnClick = (item: string, event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/boarddetail/${item}`);
  };
  //  글쓰기로 이동
  const moveregisterPageOnClick = (item: string) => {
    if (item) navigate(`/Register/${item}`);
  };

  console.log('post 데이터 확인', postsData);
  console.log('user 데이터 확인', userInfoData);
  return (
    <StboardListContainer>
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
        <Stseach />
        <Stbutton onClick={() => moveregisterPageOnClick('write')}>글쓰기</Stbutton>
      </Stselectcontainer>
      {userInfoData.map((user) => (
        <StcontentBox key={user.id} onClick={(event) => movedetailPageOnClick(user.id, event)}>
          <Username>{user.username}</Username>
          <div> {user.avatar_url}</div>
        </StcontentBox>
      ))}
    </StboardListContainer>
  );
};

const StboardListContainer = styled.div`
  display: flex;
  margin: 30px 50px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  flex-direction: column;
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

const Stseach = styled.input`
  height: 48px;
  width: 438px;
  background-color: #232323;
  border-radius: 10px;
  color: white;
  height: 48px;
  margin-left: 40px;
  margin-right: 10px; /* 여기에 margin을 추가 */
`;

const Stbutton = styled.button`
  height: 48px;
  width: 80px;
  background-color: #2d4ea5;
  border-radius: 10px;
  margin-left: 10px; /* 여기에 margin을 추가 */
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

// 메인게시판 image 부분 그리기
// post 데이터 가져오기
// userid 가져와서 프로필뿌리기
