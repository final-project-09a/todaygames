// 게시판 리스트

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { Typedata } from 'shared/supabase.type';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getGames } from 'api/games';
import { getFormattedDate } from 'util/date';
import { AiFillLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import searchIcon from '../../assets/icons/searchIcon.svg';

interface UserInfo {
  userInfo: Typedata['public']['Tables']['userinfo']['Row'];
}
// interface GameInfo {
//   app_id: number;
//   capsule_image: string;
//   genres: string[];
//   header_image: string;
//   id: number;
//   is_free: boolean;
//   name: string;
//   required_age: number;
//   short_description: string;
// }

interface GameImageProps extends React.HTMLProps<HTMLImageElement> {
  src: string;
}

export const BoardList = ({ filteredPosts }: any) => {
  const [formattedDate, setFormattedDate] = useState('');

  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  useEffect(() => {
    const currentDate = Date.now(); // 현재 시간을 가져옴
    const formatted = getFormattedDate(currentDate); // 날짜 포맷 변환
    setFormattedDate(formatted);
  }, []);
  const navigate = useNavigate();

  const { data: userInfoData = [] } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  const {
    isLoading,
    isError,
    data: getgamesData
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
  // 글쓰기 이동
  const moveregisterPageOnClick = () => {
    if (user) {
      navigate(`/register`);
    } else {
      navigate('/login');
    }
  };

  const movedetailPageOnClick = (item: string) => {
    navigate(`/boarddetail/${item}`);
  };
  // const GameImage: React.FC<GameImageProps> = ({ src, ...otherProps }) => {
  //   return <img src={src} {...otherProps} />;
  // };

  return (
    <>
      <div>
        <StSeachContainer>
          <StseachBox placeholder="게시글 검색" />
          <StSearchIcon />
          <Stbutton onClick={moveregisterPageOnClick}>글쓰기</Stbutton>
        </StSeachContainer>
        {filteredPosts.map((post: any) => {
          const userInfo = userInfoData.find((user) => user.id === post?.users_id);
          if (userInfo) {
            return (
              <>
                <StcontentBox key={post?.id} onClick={() => movedetailPageOnClick(post?.id)}>
                  <Contentbox>
                    <Profileline>
                      <UserImage src={userInfo.avatar_url} alt="프로필 이미지" />
                      {userInfo.nickname}
                      {formattedDate}
                    </Profileline>
                    <h1>{post?.title}</h1>
                    <h1>{post?.content}</h1>
                    <p>#{post?.category}</p>
                    <RowArray>
                      <CommentCount>
                        <IoChatbubbleOutline />
                        {post?.comments_count}
                      </CommentCount>
                      <Liked>
                        <AiFillLike />
                        {post?.like_count}
                      </Liked>
                      <GameImage src={post.image} />
                    </RowArray>
                  </Contentbox>
                </StcontentBox>
              </>
            );
          }
        })}
      </div>
    </>
  );
};
export const Contentbox = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  margin: 15px;
  font-size: 15px;
  color: ${(props) => props.theme.color.white};
`;
const RowArray = styled.div`
  display: flex;
`;
const StcontentBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 1180px;
  height: 283px;
  margin: 15px;
  background-color: #232323;
  border-radius: 10px;
`;

const CommentCount = styled.h3`
  width: 30px;
`;
const Liked = styled.h3`
  display: flex;
  width: 30px;
`;
const Profileline = styled.div`
  display: flex;
  width: 100%;
`;

export const GameComponent = styled.div`
  display: flex;
`;

const StSeachContainer = styled.form`
  display: flex;
  position: relative;
  left: 440px;
  margin: 30px;
`;

const StseachBox = styled.input`
  height: 48px;
  width: 438px;
  background-color: #232323;
  border-radius: 10px;
`;
const StSearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 21%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  background: url(${searchIcon});
  background-size: contain;
  cursor: pointer;
`;

const Stbutton = styled.button`
  height: 48px;
  width: 80px;
  background-color: #2d4ea5;
  border-radius: 10px;
  margin-left: 20px;
  cursor: grab;
`;

const UserImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 5px;
`;

const GameImage = styled.img`
  display: flex;
  position: relative;
  left: 870px;
  bottom: 30px;
  width: 200px;
  height: 168px;
  border-radius: 10px;
  object-fit: cover;
`;

// 메인게시판 image 부분 그리기
// post 데이터 가져오기
// userid 가져와서 프로필뿌리기

// post

// 두 쿼리의 id값이 일치할 경우 화면에 뿌려짐 로직

// useSelector 가져와서 유저 정보 학인 후  user.id == post.id맞는지 확인 후
