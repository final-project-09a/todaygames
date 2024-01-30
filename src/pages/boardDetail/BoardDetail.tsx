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
  EachTag,
  CommentAndLike,
  CommentsNum,
  LikeNum,
  RowCommentAndLike,
  WrappingComments,
  NumText
} from './style';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'query/keys';
import { UserInfo } from 'api/user';
import { getPosts } from 'api/post';
import { useParams } from 'react-router-dom';
import { supabase } from 'types/supabase';
import { SetStateAction, useState } from 'react';
import { Post } from 'types/global.d';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import CustomCarousel from 'common/CustomCarousel';
import styled from 'styled-components';
import { getFormattedDate } from 'util/date';
import comment from '../../assets/img/comment.png';
import like from '../../assets/img/like.png';
import Comment from 'components/comment/Comment';

export const BoardDetail = () => {
  const { id } = useParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);
  const [selectedImage, setSelectedImage] = useState<string | null>('');
  const [sliderIndex, setSliderIndex] = useState(0);
  const { data: gameData } = useQuery({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: getPosts
  });

  const { data: userInfoData } = useQuery({
    queryKey: [QUERY_KEYS.USERINFO],
    queryFn: UserInfo
  });
  const filterdPost = gameData?.find((game) => game.id === id);
  const filteredUser = userInfoData?.filter((user) => user.id === filterdPost?.user_id).find(() => true);
  const splitImages = filterdPost?.image.replace('[', '').replace(']', '').split(',');
  const correctImageArray = splitImages?.map((item) => item.replace(/"/g, ''));
  const correctTime = getFormattedDate(filterdPost!.created_At);

  const settings = {
    // row: 1,
    infinite: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    focusOnSelect: true,
    arrow: true
    // centerMode: true,
    // centerPadding: '0px'
  };

  console.log(correctImageArray);
  console.log(correctTime);
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
              <ProfileImage src={filteredUser?.avatar_url} />
              <WrappingUserInfo>
                <NickNameAndDate>
                  <NickNameAndTitleText>
                    {filteredUser?.nickname ? filteredUser?.nickname : 'KAKAO'}
                  </NickNameAndTitleText>
                  <DateText>{correctTime}</DateText>
                </NickNameAndDate>
                <NickNameAndTitleText>{filterdPost?.game}</NickNameAndTitleText>
              </WrappingUserInfo>
            </WrappingImgText>
            <UserInfoAndBtn />
          </UserInfoAndBtn>
          <StCarouselWrapper>
            <CustomCarousel settings={settings}>
              {correctImageArray?.map((images, index) =>
                images ? (
                  <StImageWrapper key={index}>
                    <img src={images} />
                  </StImageWrapper>
                ) : (
                  // eslint-disable-next-line react/jsx-key
                  <div></div>
                )
              )}
            </CustomCarousel>
          </StCarouselWrapper>

          <DetailTitle>{filterdPost?.title}</DetailTitle>
          <DetailContent>{filterdPost?.content}</DetailContent>
          <WrappingTags>
            <EachTag>{filterdPost?.category}</EachTag>
          </WrappingTags>
          <RowCommentAndLike>
            <CommentAndLike>
              <img src={comment} />
              <NumText>5</NumText>
            </CommentAndLike>
            <CommentAndLike>
              <img src={like} />
              <NumText>5</NumText>
            </CommentAndLike>
          </RowCommentAndLike>
          <WrappingComments>
            <Comment />
          </WrappingComments>
          {/* <Comment /> */}
        </WrappingBoardDetail>
      </AllContainer>
    </>
  );
};

const StCarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StImageWrapper = styled.figure`
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 600px;
  overflow: hidden;
  & img {
    padding: 0px 20px 0px 20px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;
