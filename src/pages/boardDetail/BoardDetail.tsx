import {
  AllContainer,
  WrappingBoardDetail,
  WrappingImgText,
  UserInfoAndBtn,
  ProfileImage,
  WrappingUserInfo,
  NickNameAndDate,
  NickNameAndTitleText,
  DateText,
  EditBtn,
  DetailImage,
  DetailTitle,
  DetailContent,
  WrappingTags,
  EachTag
} from './style';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { getPosts } from 'api/post';
import { useParams } from 'react-router-dom';
import { supabase } from 'types/supabase';
import { useState } from 'react';
import { Post } from 'types/global.d';
import Comment from 'components/comment/Comment';

export const BoardDetail = () => {
  const { id } = useParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  const { data: gameData } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });
  // const { data: postData } = useQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: getPosts
  // });

  const filteredUser = userInfoData?.filter((user) => user.id == id);
  const user = filteredUser ? filteredUser[0] : null;
  console.log(user);

  console.log(user?.nickname);
  const filterdPost = gameData
    ?.map((games) => {
      return games;
    })
    .filter((onlyGames) => {
      const postUserInfo = id;
      return onlyGames.id == postUserInfo;
    });

  const deletePost = async (id: Post) => {
    try {
      const { data, error } = await supabase.from('posts').delete().eq('id', id);
      if (error) {
        throw error;
      }
      // 게시글 삭제 후, 페이지를 새로고침하거나
      // 다른 페이지로 이동시키는 로직을 여기에 추가할 수 있습니다.
    } catch (error) {
      alert('에러가 발생했습니다');
    }
  };
  // const filteredPostCategory = postData?.filter((post) => post.category);

  // const postCategory = filteredPostCategory?.filter((category) => {
  //   return category.id == id;
  // });
  // console.log(filteredPostCategory);
  // console.log(postCategory);
  // console.log(userInfoData);
  // console.log(postData);
  return (
    <>
      <AllContainer>
        {/*nav 제외 전체영역 컨테이너 */}
        <WrappingBoardDetail>
          {/* 게시글 상세정보 전체 */}
          <UserInfoAndBtn>
            {/* 아바타이미지, 닉네임, 날짜, 게임이름 -------edit버튼 */}
            <WrappingImgText>
              {/* 아바타이미지 || 닉네임&날짜&게임이름 */}
              <ProfileImage src={user?.avatar_url} />
              <WrappingUserInfo>
                <NickNameAndDate>
                  <NickNameAndTitleText>{user?.nickname}</NickNameAndTitleText>
                  <DateText></DateText>
                </NickNameAndDate>
                <NickNameAndTitleText>{}</NickNameAndTitleText>
              </WrappingUserInfo>
            </WrappingImgText>
            <UserInfoAndBtn />
            <div>
              <EditBtn onClick={() => setDropdownVisible(!dropdownVisible)}></EditBtn>
              {dropdownVisible && (
                <div>
                  <button
                    onClick={() => {
                      /* 수정 기능을 구현한 함수를 호출 */
                    }}
                  >
                    수정
                  </button>
                  <button>삭제</button>
                </div>
              )}
            </div>
          </UserInfoAndBtn>
          {filterdPost?.map((post, index) => {
            return <DetailImage key={index} src={post.image} />;
          })}
          {filterdPost?.map((post, index) => (
            <DetailTitle key={index}>{post.title}</DetailTitle>
          ))}
          {filterdPost?.map((post, index) => (
            <DetailContent key={index}>{post.content}</DetailContent>
          ))}
          <WrappingTags>
            {filterdPost?.map((post, index) => (
              <EachTag key={index}>{post.category}</EachTag>
            ))}
          </WrappingTags>
          <br />
          {/* <Comment /> */}
        </WrappingBoardDetail>
      </AllContainer>
    </>
  );
};
