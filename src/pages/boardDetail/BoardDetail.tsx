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
  const { data: userInfoData = [] } = useQuery({
    queryKey: [QUERY_KEYS.AUTH],
    queryFn: UserInfo
  });

  // const { data: postData } = useQuery({
  //   queryKey: [QUERY_KEYS.POSTS],
  //   queryFn: getPosts
  // });

  const filteredUser = userInfoData?.filter((userInfo) => {
    return userInfo.id == id;
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
              <ProfileImage />
              <WrappingUserInfo>
                <NickNameAndDate>
                  <NickNameAndTitleText>{filteredUser[0]?.nickname}</NickNameAndTitleText>
                  <DateText>1월9일</DateText>
                </NickNameAndDate>
                <NickNameAndTitleText>게임이름</NickNameAndTitleText>
              </WrappingUserInfo>
            </WrappingImgText>
            <UserInfoAndBtn />
            <EditBtn />
          </UserInfoAndBtn>
          <DetailImage />
          <DetailTitle>글 제목</DetailTitle>
          <DetailContent>글 내용</DetailContent>
          <WrappingTags>
            <EachTag />
          </WrappingTags>
        </WrappingBoardDetail>
      </AllContainer>
    </>
  );
};
