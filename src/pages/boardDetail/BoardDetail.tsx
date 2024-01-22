import { useSelector } from 'react-redux';
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

export const BoardDetail = () => {
  const { id } = useParams();
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
  console.log(filteredUser);

  console.log(user?.nickname);
  const filterdPost = gameData
    ?.map((games) => {
      return games;
    })
    .filter((onlyGames) => {
      const postUserInfo = id;
      return onlyGames.id == postUserInfo;
    });

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
            <EditBtn />
          </UserInfoAndBtn>
          {filterdPost?.map((post, index) => (
            <DetailImage key={index} src={post.image.replace('blob:', '').replace('[', '').replace(']', '')} />
          ))}
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
          <h1>댓글이 보여질 곳입니다.</h1>
        </WrappingBoardDetail>
      </AllContainer>
    </>
  );
};
