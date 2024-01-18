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
import { getFormattedDate } from 'util/date';
import { AiFillLike } from 'react-icons/ai';
import { IoChatbubbleOutline } from 'react-icons/io5';

interface PostType {
  data: Typedata['public']['Tables']['posts']['Row'];
}
interface UserInfos {
  userInfo: Typedata['public']['Tables']['userinfo']['Row'];
}
interface Games {
  getGames: Typedata['public']['Tables']['games']['Row'];
}
interface GameInfo {
  app_id: number;
  capsule_image: string;
  genres: string[];
  header_image: string;
  id: number;
  is_free: boolean;
  name: string;
  required_age: number;
  short_description: string;
}
interface GameImageProps extends React.HTMLProps<HTMLImageElement> {
  src: string;
}
export const Main = () => {
  // const {data} = useSelector()
  const [formattedDate, setFormattedDate] = useState('');

  const [gameInfoList, setGameInfoList] = useState<GameInfo[]>([]);

  useEffect(() => {
    const currentDate = Date.now(); // 현재 시간을 가져옴
    const formatted = getFormattedDate(currentDate); // 날짜 포맷 변환
    setFormattedDate(formatted);
  }, []);
  const navigate = useNavigate();

  const { data: postsData = [] } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });
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
  //  글쓰기로 이동
  const moveregisterPageOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { item } = event.currentTarget.dataset;
    if (item) navigate(`/Register/${item}`);
  };
  const movedetailPageOnClick = (item: string, event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/boarddetail/${item}`);
  };
  const GameImage: React.FC<GameImageProps> = ({ src, ...otherProps }) => {
    return <img src={src} {...otherProps} />;
  };
  return (
    <>
      <Stselectcontainer>
        <StSeachandButton>
          <Stseach />
          <Stbutton onClick={moveregisterPageOnClick}>글쓰기</Stbutton>
        </StSeachandButton>
      </Stselectcontainer>
      {/* 박스 개수 = posts 컬럼 개수 = postData의 아이디와 userInfoData의 같다면 해당 유저 id만 출력 */}
      {/* {박스 안에 유저에 따라 프로필, 이름, 게임이름, 제목, 내용, 게임장르 순서대로 map} */}
      {/* games에서 게임명, 장르 => id로 판별 */}
      {postsData.map((post) => {
        const userInfo = userInfoData.find((user) => user.id === post.users_id);
        if (userInfo) {
          return (
            <>
              <StcontentBox key={post.id} onClick={(event) => movedetailPageOnClick(post.id, event)}>
                <Contentbox>
                  <Profileline>
                    <UserImage src={userInfo.avatar_url} alt="프로필 이미지" />
                    {userInfo.username}

                    {formattedDate}
                  </Profileline>

                  <h1>{post.title}</h1>
                  <h1>{post.content}</h1>
                  <p>#{post.category}</p>
                  <RowArray>
                    <CommentCount>
                      <IoChatbubbleOutline />
                      {post.comments_count}
                    </CommentCount>
                    <Liked>
                      <AiFillLike />
                      {post.like_count}
                    </Liked>
                    <GameImage src={post.image} />
                  </RowArray>
                </Contentbox>
              </StcontentBox>
            </>
          );
        }
      })}
    </>
  );
};
export const Contentbox = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 2fr);
  margin: 15px;
  font-size: 15px;
  color: #ffffff;
`;
const RowArray = styled.div`
  display: flex;
`;
const StcontentBox = styled.div`
  display: grid;
  grid-template-columns: repeat(0, 1fr);
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

const Stselectcontainer = styled.div`
  display: flex;
  justify-content: space-around;
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

const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 5px;
`;

// 메인게시판 image 부분 그리기
// post 데이터 가져오기
// userid 가져와서 프로필뿌리기

// post

// 두 쿼리의 id값이 일치할 경우 화면에 뿌려짐 로직

// useSelector 가져와서 유저 정보 학인 후  user.id == post.id맞는지 확인 후
