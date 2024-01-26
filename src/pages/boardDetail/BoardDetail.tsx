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
import { SetStateAction, useState } from 'react';
import { Post } from 'types/global.d';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/config/configStore';
import CustomCarousel from 'common/CustomCarousel';
import styled from 'styled-components';
import { getFormattedDate } from 'util/date';

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

  const filterdPost = gameData?.find((game) => game.id === id);
  const filteredUser = userInfoData?.filter((user) => user.id === filterdPost?.user_id).find(() => true);
  const splitImages = filterdPost?.image.replace('[', '').replace(']', '').split(',');
  const correctImageArray = splitImages?.map((item) => item.replace(/"/g, ''));
  const correctTime = getFormattedDate(filterdPost!.created_At);
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
                  <NickNameAndTitleText>{filteredUser?.nickname}</NickNameAndTitleText>
                  <DateText>{correctTime}</DateText>
                </NickNameAndDate>
                <NickNameAndTitleText>{filterdPost?.game}</NickNameAndTitleText>
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
          <StCarouselWrapper>
            <CustomCarousel settings={settings}>
              {correctImageArray?.map((images, index) => (
                <StImageWrapper key={index}>
                  <img src={images} />
                </StImageWrapper>
              ))}
            </CustomCarousel>
          </StCarouselWrapper>

          <DetailTitle>{filterdPost?.title}</DetailTitle>
          <DetailContent>{filterdPost?.content}</DetailContent>
          <WrappingTags>
            <EachTag>{filterdPost?.category}</EachTag>
          </WrappingTags>
          <br />
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
